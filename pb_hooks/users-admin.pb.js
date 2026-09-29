/// <reference path="../pb_data/types.d.ts" />

// Block login for disabled (verified=false) users
onRecordAuthWithPasswordRequest(function(e) {
  if (e.record && !e.record.getBool("verified")) {
    throw new ApiError(403, "Your account is temporarily disabled. Please contact your admin.")
  }
  e.next()
}, "users")

// POST /api/admin/update-name  { name }
routerAdd("POST", "/api/admin/update-name", function(e) {
  try {
    var auth = e.requestInfo().auth
    if (!auth) return e.json(401, { message: "Not authenticated" })
    if (auth.isSuperuser()) return e.json(400, { message: "Name update not supported for superuser accounts" })

    var name = ((e.requestInfo().body.name) || "").toString().trim()
    auth.set("name", name)
    $app.save(auth)
    return e.json(200, { name: name })
  } catch(err) {
    return e.json(500, { message: err.message })
  }
})

// POST /api/admin/change-password  { oldPassword, newPassword }
routerAdd("POST", "/api/admin/change-password", function(e) {
  try {
    var auth = e.requestInfo().auth
    if (!auth) {
      return e.json(401, { message: "Not authenticated" })
    }

    var body        = e.requestInfo().body
    var oldPassword = (body.oldPassword || "").toString()
    var newPassword = (body.newPassword || "").toString()

    if (!oldPassword || !newPassword) {
      return e.json(400, { message: "Old and new password are required" })
    }
    if (newPassword.length < 8) {
      return e.json(400, { message: "New password must be at least 8 characters" })
    }
    if (!auth.validatePassword(oldPassword)) {
      return e.json(400, { message: "Old password is incorrect" })
    }

    auth.setPassword(newPassword)
    $app.save(auth)

    console.log("[change-password] Password changed for: " + auth.getString("email"))
    return e.json(200, { message: "Password changed successfully" })
  } catch(err) {
    return e.json(500, { message: err.message })
  }
})

// GET /api/admin/users
routerAdd("GET", "/api/admin/users", function(e) {
  try {
    var auth = e.requestInfo().auth
    if (!auth || !auth.isSuperuser()) {
      return e.json(403, { message: "Forbidden" })
    }

    var allUsers = []

    try {
      var superusers = $app.findRecordsByFilter("_superusers", "email != ''", "-created", 200, 0)
      for (var i = 0; i < superusers.length; i++) {
        var u = superusers[i]
        allUsers.push({
          id: u.id,
          email: u.getString("email"),
          role: "admin",
          verified: u.getBool("verified"),
          created: u.getString("created"),
          updated: u.getString("updated"),
        })
      }
    } catch(e1) { console.error("[users-admin] superusers: " + e1.message) }

    try {
      var editors = $app.findRecordsByFilter("users", "email != ''", "-created", 200, 0)
      for (var j = 0; j < editors.length; j++) {
        var u2 = editors[j]
        allUsers.push({
          id: u2.id,
          email: u2.getString("email"),
          role: "editor",
          verified: u2.getBool("verified"),
          created: u2.getString("created"),
          updated: u2.getString("updated"),
        })
      }
    } catch(e2) { console.error("[users-admin] editors: " + e2.message) }

    return e.json(200, { users: allUsers })
  } catch(e3) {
    return e.json(500, { message: e3.message })
  }
})

// POST /api/admin/users/toggle-active  { id, verified }
routerAdd("POST", "/api/admin/users/toggle-active", function(e) {
  try {
    var auth = e.requestInfo().auth
    if (!auth || !auth.isSuperuser()) {
      return e.json(403, { message: "Forbidden" })
    }

    var body     = e.requestInfo().body
    var id       = (body.id || "").toString().trim()
    var verified = body.verified === true

    if (!id) return e.json(400, { message: "id is required" })

    var record = null
    try { record = $app.findRecordById("_superusers", id) } catch(_) {}
    if (!record) {
      try { record = $app.findRecordById("users", id) } catch(_) {}
    }
    if (!record) return e.json(404, { message: "User not found" })

    record.set("verified", verified)
    $app.save(record)

    return e.json(200, { id: id, verified: verified })
  } catch(err) {
    return e.json(500, { message: err.message })
  }
})

// POST /api/admin/users/change-role  { id, role }
routerAdd("POST", "/api/admin/users/change-role", function(e) {
  try {
    var auth = e.requestInfo().auth
    if (!auth || !auth.isSuperuser()) {
      return e.json(403, { message: "Forbidden" })
    }

    var body    = e.requestInfo().body
    var id      = (body.id || "").toString().trim()
    var newRole = (body.role || "").toString().trim()

    if (!id) return e.json(400, { message: "id is required" })
    if (newRole !== "editor" && newRole !== "admin") {
      return e.json(400, { message: "role must be 'editor' or 'admin'" })
    }

    var record = null
    var currentCollection = ""
    try { record = $app.findRecordById("_superusers", id); currentCollection = "_superusers" } catch(_) {}
    if (!record) {
      try { record = $app.findRecordById("users", id); currentCollection = "users" } catch(_) {}
    }
    if (!record) return e.json(404, { message: "User not found" })

    var targetCollection = newRole === "admin" ? "_superusers" : "users"
    if (currentCollection === targetCollection) {
      return e.json(200, { message: "User already has this role" })
    }

    var email    = record.getString("email")
    var verified = record.getBool("verified")

    var chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$"
    var password = ""
    for (var i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    var newCol    = $app.findCollectionByNameOrId(targetCollection)
    var newRecord = new Record(newCol)
    newRecord.set("email", email)
    newRecord.set("password", password)
    newRecord.set("passwordConfirm", password)
    newRecord.set("verified", verified)
    $app.save(newRecord)

    $app.delete(record)

    var roleLabel = newRole === "admin" ? "Admin (Superuser)" : "Editor"
    var loginUrl  = "https://social.carry.exchange"
    var html = '<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">'
      + '<img src="https://carry.exchange/favicon.jpeg" style="width:64px;height:64px;border-radius:50%;display:block;margin:0 auto 28px;" />'
      + '<h2 style="font-weight:400;font-size:24px;color:#111827;margin-bottom:8px;">Your role has been updated</h2>'
      + '<p style="color:#6b7280;font-size:15px;margin-bottom:24px;">Your role is now <strong style="color:#7c3aed;">' + roleLabel + '</strong>.</p>'
      + '<div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">'
      + '<p style="color:#374151;font-size:14px;font-weight:500;margin:0 0 12px;">New login credentials:</p>'
      + '<p style="color:#6b7280;font-size:13px;margin:0 0 4px;">Email</p>'
      + '<p style="color:#111827;font-size:15px;font-weight:500;margin:0 0 16px;">' + email + '</p>'
      + '<p style="color:#6b7280;font-size:13px;margin:0 0 4px;">Temporary Password</p>'
      + '<p style="font-family:monospace;font-size:18px;font-weight:600;color:#7c3aed;background:#f5f3ff;padding:10px 14px;border-radius:8px;margin:0;">' + password + '</p>'
      + '</div>'
      + '<a href="' + loginUrl + '" style="display:inline-block;padding:12px 28px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:500;">Login to Admin Panel</a>'
      + '</div>'

    try {
      $app.newMailClient().send(new MailerMessage({
        from: { address: $app.settings().meta.senderAddress, name: $app.settings().meta.senderName },
        to:   [{ address: email }],
        subject: "Your Carry Admin role has been updated",
        html: html,
      }))
    } catch(_) {}

    console.log("[users-admin] Role changed: " + email + " -> " + roleLabel)
    return e.json(200, { message: "Role updated" })
  } catch(err) {
    return e.json(500, { message: err.message })
  }
})

// POST /api/admin/users/delete  { id }
routerAdd("POST", "/api/admin/users/delete", function(e) {
  try {
    var auth = e.requestInfo().auth
    if (!auth || !auth.isSuperuser()) {
      return e.json(403, { message: "Forbidden" })
    }

    var body   = e.requestInfo().body
    var id     = (body.id || "").toString().trim()
    var authId = auth.id

    if (!id) return e.json(400, { message: "id is required" })
    if (id === authId) return e.json(400, { message: "You cannot delete your own account" })

    var record = null
    try { record = $app.findRecordById("_superusers", id) } catch(_) {}
    if (!record) {
      try { record = $app.findRecordById("users", id) } catch(_) {}
    }
    if (!record) return e.json(404, { message: "User not found" })

    $app.delete(record)
    return e.json(200, { message: "User deleted" })
  } catch(err) {
    return e.json(500, { message: err.message })
  }
})
