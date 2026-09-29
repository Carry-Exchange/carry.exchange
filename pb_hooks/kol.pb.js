/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/kol/referrer/{code}", function(e) {
  try {
    var code = e.request.pathValue("code").toUpperCase();
    var results = $app.findRecordsByFilter("kol_users", 'referral_code = "' + code + '"', "", 1, 0);
    if (!results || results.length === 0) {
      return e.json(404, { message: "Referrer not found" });
    }
    var record = results[0];
    return e.json(200, { name: record.get("name") || "" });
  } catch(err) {
    return e.json(500, { message: err.message || "Internal error" });
  }
});

routerAdd("POST", "/api/kol/update-profile", function(e) {
  try {
    var body = e.requestInfo().body;
    var id = (body["id"] || "").toString().trim();
    var name = (body["name"] || "").toString().trim();
    var twitter = (body["twitter"] || "").toString().trim();
    var contact = (body["contact"] || "").toString().trim();
    var telegram = (body["telegram"] || "").toString().trim();

    if (!id) return e.json(400, { message: "User ID required" });
    if (!name) return e.json(400, { message: "Name is required" });
    if (!contact) return e.json(400, { message: "Contact number is required" });

    var record = $app.findRecordById("kol_users", id);
    record.set("name", name);
    record.set("twitter", twitter);
    record.set("contact", contact);
    record.set("telegram", telegram);
    $app.save(record);

    return e.json(200, {
      id: record.id,
      email: record.get("email"),
      referral_code: record.get("referral_code"),
      name: record.get("name"),
      twitter: record.get("twitter") || "",
      contact: record.get("contact"),
      telegram: record.get("telegram") || "",
    });
  } catch(err) {
    console.error("[kol] update-profile error: " + (err.message || String(err)));
    return e.json(500, { message: err.message || "Internal error" });
  }
});

routerAdd("POST", "/api/kol/send-otp", function(e) {
  try {
    var body = e.requestInfo().body;
    var email = (body["email"] || "").toString().trim().toLowerCase();

    if (!email || email.indexOf("@") === -1) {
      return e.json(400, { message: "Valid email is required" });
    }

    var otp = String(Math.floor(100000 + Math.random() * 900000));
    var otpExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    var collection = $app.findCollectionByNameOrId("kol_users");
    var record = null;

    try {
      var results = $app.findRecordsByFilter("kol_users", 'email = "' + email + '"', "", 1, 0);
      if (results && results.length > 0) record = results[0];
    } catch(_) {}

    if (!record) {
      var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var numeric = "0123456789";
      var referralCode = "";
      for (var i = 0; i < 3; i++) referralCode += alpha[Math.floor(Math.random() * alpha.length)];
      for (var i = 0; i < 3; i++) referralCode += numeric[Math.floor(Math.random() * numeric.length)];

      record = new Record(collection);
      record.set("email", email);
      record.set("referral_code", referralCode);
    }

    record.set("otp", otp);
    record.set("otp_expires", otpExpires);
    $app.save(record);

    var otpHtml = '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;text-align:center;">'
      + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;margin:0 auto 24px;display:block;" />'
      + '<h2 style="font-weight:400;margin-bottom:8px;">Your OTP — Carry Exchange</h2>'
      + '<p style="color:#555;font-size:14px;margin-bottom:24px;">Use the code below to sign in to your KOL dashboard.</p>'
      + '<div style="background:#1f2937;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">'
      + '<span style="font-size:36px;font-weight:600;letter-spacing:0.4em;color:#a78bfa;font-family:monospace;">' + otp + '</span>'
      + '</div>'
      + '<p style="color:#888;font-size:12px;">This code expires in 15 minutes. If you did not request this, ignore this email.</p>'
      + '</div>';

    try {
      $app.newMailClient().send(new MailerMessage({
        from: {
          address: $app.settings().meta.senderAddress,
          name: $app.settings().meta.senderName,
        },
        to: [{ address: email }],
        subject: "Your KOL sign-in OTP — Carry Exchange",
        html: otpHtml,
      }));
      console.log("[kol] OTP email sent to " + email);
    } catch(mailErr) {
      console.error("[kol] mail error: " + (mailErr.message || String(mailErr)));
    }

    console.log("[kol] OTP for " + email + ": " + otp);
    return e.json(200, { success: true });
  } catch(err) {
    console.error("[kol] send-otp error: " + (err.message || String(err)));
    return e.json(500, { message: err.message || "Internal error" });
  }
});

routerAdd("POST", "/api/kol/verify-otp", function(e) {
  try {
    var body = e.requestInfo().body;
    var email = (body["email"] || "").toString().trim().toLowerCase();
    var otp = (body["otp"] || "").toString().trim();

    if (!email || !otp) {
      return e.json(400, { message: "Email and OTP are required" });
    }

    var record = null;
    try {
      var results = $app.findRecordsByFilter("kol_users", 'email = "' + email + '"', "", 1, 0);
      if (results && results.length > 0) record = results[0];
    } catch(_) {}

    if (!record) return e.json(401, { message: "Invalid credentials" });

    var storedOtp = record.get("otp");
    var otpExpires = record.get("otp_expires");

    if (!storedOtp || storedOtp !== otp) return e.json(401, { message: "Invalid OTP" });
    if (!otpExpires || new Date(otpExpires) < new Date()) return e.json(401, { message: "OTP has expired." });

    record.set("otp", "");
    record.set("otp_expires", "");
    $app.save(record);

    return e.json(200, {
      id: record.id,
      email: record.get("email"),
      referral_code: record.get("referral_code"),
      name: record.get("name") || "",
      twitter: record.get("twitter") || "",
      contact: record.get("contact") || "",
      telegram: record.get("telegram") || "",
    });
  } catch(err) {
    console.error("[kol] verify-otp error: " + (err.message || String(err)));
    return e.json(500, { message: err.message || "Internal error" });
  }
});
