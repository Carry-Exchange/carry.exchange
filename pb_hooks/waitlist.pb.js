/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess(function(e) {
  var record = e.record;
  var email = record.get("email") || "";
  var referralCode = (record.get("referral_code") || "").toString().toUpperCase();

  // 1. Welcome mail to the new joiner
  var welcomeHtml = '<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">'
    + '<div style="text-align:center;margin-bottom:28px;">'
    + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;display:inline-block;" />'
    + '</div>'
    + '<h2 style="font-weight:400;font-size:24px;margin-bottom:8px;color:#111827;">You\'re on the waitlist 🎉</h2>'
    + '<p style="color:#6b7280;font-size:15px;line-height:1.6;margin-bottom:24px;">Welcome to Carry Exchange — the first on-chain platform for commodity derivatives. We\'ll notify you as soon as early access opens.</p>'
    + '<div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">'
    + '<p style="color:#374151;font-size:14px;margin:0 0 4px;font-weight:500;">What\'s coming:</p>'
    + '<ul style="color:#6b7280;font-size:14px;margin:8px 0 0;padding-left:20px;line-height:1.8;">'
    + '<li>Commodity Perpetual Futures</li>'
    + '<li>Tokenized Spot Markets</li>'
    + '<li>Prediction Markets</li>'
    + '<li>Up to 22% staking yield</li>'
    + '</ul>'
    + '</div>'
    + '<p style="color:#6b7280;font-size:13px;">In the meantime, follow us on <a href="https://x.com/carryexchange" style="color:#7c3aed;">X (Twitter)</a> for updates.</p>'
    + '</div>';

  try {
    $app.newMailClient().send(new MailerMessage({
      from: { address: $app.settings().meta.senderAddress, name: $app.settings().meta.senderName },
      to: [{ address: email }],
      subject: "You're on the Carry Exchange waitlist!",
      html: welcomeHtml,
    }));
    console.log("[waitlist] Welcome mail sent to " + email);
  } catch(err) {
    console.error("[waitlist] Welcome mail error: " + err.message);
  }

  // 2. Notify the referrer (KOL user) if referral code present
  if (!referralCode) return;

  var referrer = null;
  try {
    var results = $app.findRecordsByFilter("kol_users", 'referral_code = "' + referralCode + '"', "", 1, 0);
    if (results && results.length > 0) referrer = results[0];
  } catch(_) {}

  if (!referrer) return;

  var referrerEmail = referrer.get("email") || "";
  var referrerName = referrer.get("name") || "there";
  if (!referrerEmail) return;

  var notifyHtml = '<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;">'
    + '<div style="text-align:center;margin-bottom:28px;">'
    + '<img src="https://carry.exchange/favicon.jpeg" alt="Carry Exchange" style="width:64px;height:64px;object-fit:cover;border-radius:50%;display:inline-block;" />'
    + '</div>'
    + '<h2 style="font-weight:400;font-size:24px;margin-bottom:8px;color:#111827;">New referral, ' + referrerName + '! 🙌</h2>'
    + '<p style="color:#6b7280;font-size:15px;line-height:1.6;margin-bottom:24px;">Someone just joined the Carry Exchange waitlist using your referral code <strong style="color:#7c3aed;">' + referralCode + '</strong>.</p>'
    + '<div style="background:#f5f3ff;border:1px solid #ede9fe;border-radius:12px;padding:20px;margin-bottom:24px;">'
    + '<p style="color:#6b7280;font-size:13px;margin:0 0 4px;">Joined with email</p>'
    + '<p style="color:#374151;font-size:15px;font-weight:500;margin:0;">' + email.replace(/(.{2})(.*)(@.*)/, '$1***$3') + '</p>'
    + '</div>'
    + '<p style="color:#6b7280;font-size:13px;">Keep sharing your link to grow your referrals. Visit your <a href="https://carry.exchange/kol" style="color:#7c3aed;">KOL dashboard</a> to track progress.</p>'
    + '</div>';

  try {
    $app.newMailClient().send(new MailerMessage({
      from: { address: $app.settings().meta.senderAddress, name: $app.settings().meta.senderName },
      to: [{ address: referrerEmail }],
      subject: "Someone joined via your referral — Carry Exchange",
      html: notifyHtml,
    }));
    console.log("[waitlist] Referrer notified: " + referrerEmail + " for code " + referralCode);
  } catch(err) {
    console.error("[waitlist] Referrer mail error: " + err.message);
  }
}, "waitlist_entries");
