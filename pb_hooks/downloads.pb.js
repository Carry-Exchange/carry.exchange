/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/downloads/send-link", function(e) {
  try {
    var body = e.requestInfo().body;
    var email = (body["email"] || "").toString().trim().toLowerCase();
    var documentId = (body["document_id"] || "").toString().trim();
    var documentTitle = (body["document_title"] || "").toString().trim();
    var pdfUrl = (body["pdf_url"] || "").toString().trim();

    if (!email || email.indexOf("@") === -1) {
      return e.json(400, { message: "Valid email is required" });
    }

    try {
      var logsCollection = $app.findCollectionByNameOrId("download_logs");
      var logRecord = new Record(logsCollection);
      logRecord.set("email", email);
      logRecord.set("document_id", documentId);
      logRecord.set("document_title", documentTitle);
      $app.save(logRecord);
    } catch(logErr) {
      console.error("[downloads] log error: " + logErr.message);
    }

    var linkHtml = '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;text-align:center;">'
      + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;margin:0 auto 24px;display:block;" />'
      + '<h2 style="font-weight:400;margin-bottom:8px;">Your download is ready</h2>'
      + '<p style="color:#555;font-size:14px;margin-bottom:24px;">Click below to download <strong>' + documentTitle + '</strong>.</p>'
      + '<a href="' + pdfUrl + '" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:500;font-size:15px;margin-bottom:24px;">Download PDF</a>'
      + '<p style="color:#888;font-size:12px;">If the button does not work, copy this link: <a href="' + pdfUrl + '" style="color:#a78bfa;">' + pdfUrl + '</a></p>'
      + '</div>';

    try {
      $app.newMailClient().send(new MailerMessage({
        from: {
          address: $app.settings().meta.senderAddress,
          name: $app.settings().meta.senderName,
        },
        to: [{ address: email }],
        subject: "Your download is ready — " + documentTitle,
        html: linkHtml,
      }));
      console.log("[downloads] PDF link sent to " + email);
    } catch(mailErr) {
      console.error("[downloads] mail error: " + (mailErr.message || String(mailErr)));
      return e.json(500, { message: "Failed to send email" });
    }

    return e.json(200, { success: true });
  } catch(err) {
    console.error("[downloads] send-link error: " + (err.message || String(err)));
    return e.json(500, { message: err.message || "Internal error" });
  }
});

routerAdd("POST", "/api/downloads/send-otp", function(e) {
  try {
    var body = e.requestInfo().body;
    var email = (body["email"] || "").toString().trim().toLowerCase();
    var documentId = (body["document_id"] || "").toString().trim();
    var documentTitle = (body["document_title"] || "").toString().trim();
    var pdfUrl = (body["pdf_url"] || "").toString().trim();

    if (!email || email.indexOf("@") === -1) {
      return e.json(400, { message: "Valid email is required" });
    }

    var otp = String(Math.floor(100000 + Math.random() * 900000));
    var otpExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    var collection = $app.findCollectionByNameOrId("download_otps");
    var record = null;

    try {
      var results = $app.findRecordsByFilter(
        "download_otps",
        'email = "' + email + '" && document_id = "' + documentId + '"',
        "", 1, 0
      );
      if (results && results.length > 0) record = results[0];
    } catch(_) {}

    if (!record) {
      record = new Record(collection);
      record.set("email", email);
    }

    record.set("otp", otp);
    record.set("otp_expires", otpExpires);
    record.set("document_id", documentId);
    record.set("document_title", documentTitle);
    record.set("pdf_url", pdfUrl);
    $app.save(record);

    var otpHtml = '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;text-align:center;">'
      + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;margin:0 auto 24px;display:block;" />'
      + '<h2 style="font-weight:400;margin-bottom:8px;">Your OTP — Carry Exchange</h2>'
      + '<p style="color:#555;font-size:14px;margin-bottom:24px;">Use the code below to download <strong>' + documentTitle + '</strong>.</p>'
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
        subject: "Your download OTP — Carry Exchange",
        html: otpHtml,
      }));
      console.log("[downloads] OTP email sent to " + email);
    } catch(mailErr) {
      console.error("[downloads] mail error: " + (mailErr.message || String(mailErr)));
      return e.json(500, { message: "Failed to send OTP email" });
    }

    console.log("[downloads] OTP for " + email + ": " + otp);
    return e.json(200, { success: true });
  } catch(err) {
    console.error("[downloads] send-otp error: " + (err.message || String(err)));
    return e.json(500, { message: err.message || "Internal error" });
  }
});

routerAdd("POST", "/api/downloads/verify-otp", function(e) {
  try {
    var body = e.requestInfo().body;
    var email = (body["email"] || "").toString().trim().toLowerCase();
    var otp = (body["otp"] || "").toString().trim();
    var documentId = (body["document_id"] || "").toString().trim();

    if (!email || !otp) {
      return e.json(400, { message: "Email and OTP are required" });
    }

    var record = null;
    try {
      var results = $app.findRecordsByFilter(
        "download_otps",
        'email = "' + email + '" && document_id = "' + documentId + '"',
        "", 1, 0
      );
      if (results && results.length > 0) record = results[0];
    } catch(_) {}

    if (!record) return e.json(401, { message: "Invalid credentials" });

    var storedOtp = record.get("otp");
    var otpExpires = record.get("otp_expires");
    var pdfUrl = record.get("pdf_url");
    var documentTitle = record.get("document_title");

    if (!storedOtp || storedOtp !== otp) return e.json(401, { message: "Invalid OTP" });
    if (!otpExpires || new Date(otpExpires) < new Date()) return e.json(401, { message: "OTP has expired" });

    record.set("otp", "");
    record.set("otp_expires", "");
    $app.save(record);

    // Log the download
    try {
      var logsCollection = $app.findCollectionByNameOrId("download_logs");
      var logRecord = new Record(logsCollection);
      logRecord.set("email", email);
      logRecord.set("document_id", documentId);
      logRecord.set("document_title", documentTitle);
      $app.save(logRecord);
    } catch(logErr) {
      console.error("[downloads] log error: " + logErr.message);
    }

    // Send PDF link email
    var linkHtml = '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;text-align:center;">'
      + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;margin:0 auto 24px;display:block;" />'
      + '<h2 style="font-weight:400;margin-bottom:8px;">Your download is ready</h2>'
      + '<p style="color:#555;font-size:14px;margin-bottom:24px;">Click below to download <strong>' + documentTitle + '</strong>.</p>'
      + '<a href="' + pdfUrl + '" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:500;font-size:15px;margin-bottom:24px;">Download PDF</a>'
      + '<p style="color:#888;font-size:12px;">If the button does not work, copy this link: <a href="' + pdfUrl + '" style="color:#a78bfa;">' + pdfUrl + '</a></p>'
      + '</div>';

    try {
      $app.newMailClient().send(new MailerMessage({
        from: {
          address: $app.settings().meta.senderAddress,
          name: $app.settings().meta.senderName,
        },
        to: [{ address: email }],
        subject: "Your download is ready — " + documentTitle,
        html: linkHtml,
      }));
      console.log("[downloads] PDF link sent to " + email);
    } catch(mailErr) {
      console.error("[downloads] mail error: " + (mailErr.message || String(mailErr)));
    }
    return e.json(200, { success: true, pdf_url: pdfUrl });
  } catch(err) {
    console.error("[downloads] verify-otp error: " + (err.message || String(err)));
    return e.json(500, { message: err.message || "Internal error" });
  }
});
