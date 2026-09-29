/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/invite/send", function(e) {
  // Only superusers can send invites
  var info = e.requestInfo()
  var auth = info.auth
  if (!auth || !auth.isSuperuser()) {
    return e.json(403, { message: "Forbidden: only superusers can send invites" })
  }

  var data = e.requestInfo().body
  var email = (data.email || "").trim().toLowerCase()
  var role  = (data.role  || "editor").trim() // "editor" or "admin"

  if (!email) {
    return e.json(400, { message: "Email is required" })
  }

  // Generate a 16-char secure temporary password
  var chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$"
  var password = ""
  for (var i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  var collectionName = role === "admin" ? "_superusers" : "users"

  try {
    var collection = $app.findCollectionByNameOrId(collectionName)
    var record = new Record(collection)
    record.set("email", email)
    record.set("password", password)
    record.set("passwordConfirm", password)
    $app.save(record)
  } catch(err) {
    return e.json(400, { message: "Failed to create user: " + err.message })
  }

  var loginUrl  = "https://social.carry.exchange"
  var roleLabel = role === "admin" ? "Admin" : "Editor"

  var html = '<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">'
    + '<div style="text-align:center;margin-bottom:28px;">'
    + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;display:inline-block;" />'
    + '</div>'
    + '<h2 style="font-weight:400;font-size:24px;margin-bottom:8px;color:#111827;">You\'ve been invited to Carry Admin</h2>'
    + '<p style="color:#6b7280;font-size:15px;line-height:1.6;margin-bottom:24px;">You have been added as an <strong style="color:#7c3aed;">' + roleLabel + '</strong> on the Carry Exchange admin panel.</p>'
    + '<div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">'
    + '<p style="color:#374151;font-size:14px;margin:0 0 12px;font-weight:500;">Your login credentials:</p>'
    + '<p style="color:#6b7280;font-size:13px;margin:0 0 4px;">Email</p>'
    + '<p style="color:#111827;font-size:15px;font-weight:500;margin:0 0 16px;">' + email + '</p>'
    + '<p style="color:#6b7280;font-size:13px;margin:0 0 4px;">Temporary Password</p>'
    + '<p style="font-family:monospace;font-size:18px;font-weight:600;color:#7c3aed;background:#f5f3ff;padding:10px 14px;border-radius:8px;margin:0;letter-spacing:1px;">' + password + '</p>'
    + '</div>'
    + '<a href="' + loginUrl + '" style="display:inline-block;padding:12px 28px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:500;margin-bottom:24px;">Login to Admin Panel</a>'
    + '<p style="color:#9ca3af;font-size:13px;line-height:1.6;">Please change your password after your first login. Do not share these credentials with anyone.</p>'
    + '</div>'

  try {
    $app.newMailClient().send(new MailerMessage({
      from: { address: $app.settings().meta.senderAddress, name: $app.settings().meta.senderName },
      to: [{ address: email }],
      subject: "You've been invited to Carry Exchange Admin",
      html: html,
    }))
  } catch(err) {
    console.error("[invite] Email failed for " + email + ": " + err.message)
    return e.json(200, { message: "User created but email could not be sent.", emailSent: false })
  }

  console.log("[invite] Invited " + email + " as " + roleLabel)
  return e.json(200, { message: "Invite sent successfully", emailSent: true })
})
