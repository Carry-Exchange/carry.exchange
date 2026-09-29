export const PB_URL = import.meta.env.VITE_PB_URL || "http://127.0.0.1:8090";

const CARRY_API = "https://api.carry.exchange/api/v1";
export const TERMINAL_API = "https://terminal.carry.exchange/api/v1";

const _assetCache = new Map();

export async function fetchAssets(category, { terminal = false } = {}) {
  const base = terminal ? TERMINAL_API : CARRY_API;
  const key = `${base}/assets?category=${category}`;
  if (_assetCache.has(key)) return _assetCache.get(key);
  const promise = fetch(key)
    .then((r) => r.json())
    .then((d) => d.items ?? [])
    .catch(() => []);
  _assetCache.set(key, promise);
  return promise;
}

export async function sendOtp(email) {
  const res = await fetch(`${PB_URL}/api/kol/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send OTP");
  return data;
}

export async function verifyOtp(email, otp) {
  const res = await fetch(`${PB_URL}/api/kol/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Invalid or expired OTP");
  return data; // { id, email, referral_code }
}

export async function joinWaitlist(email, referralCode) {
  const res = await fetch(
    `${PB_URL}/api/collections/waitlist_entries/records`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, referral_code: referralCode || "" }),
    }
  );
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 400 && data?.data?.email) {
      throw new Error("This email is already on the waitlist!");
    }
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export async function logDownload(email, documentId, documentTitle) {
  const res = await fetch(`${PB_URL}/api/collections/download_logs/records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, document_id: documentId, document_title: documentTitle }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to log download");
  return data;
}

export async function getReferrerName(code) {
  const res = await fetch(`${PB_URL}/api/kol/referrer/${code}`);
  const data = await res.json();
  if (!res.ok) return null;
  return data.name || null;
}

export async function updateProfile(id, { name, twitter, contact, telegram }) {
  const res = await fetch(`${PB_URL}/api/kol/update-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, twitter, contact, telegram }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
}

export async function getWaitlistCount() {
  const res = await fetch(
    `${PB_URL}/api/collections/waitlist_entries/records?perPage=1&fields=id`
  );
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch waitlist count");
  return data.totalItems ?? 0;
}

export async function getReferrals(referralCode) {
  const filter = encodeURIComponent(`referral_code='${referralCode}'`);
  const res = await fetch(
    `${PB_URL}/api/collections/waitlist_entries/records?filter=${filter}&sort=-joined_at&perPage=200`,
    { headers: { "Content-Type": "application/json" } }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load referrals");
  return data.items || [];
}

export async function getBlogs({ page = 1, perPage = 12, tag = "" } = {}) {
  const filter = tag ? encodeURIComponent(`tags~'${tag}'`) : "";
  const url = `${PB_URL}/api/collections/blogs/records?sort=-published_at&page=${page}&perPage=${perPage}${filter ? `&filter=${filter}` : ""}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load blogs");
  return data;
}

export async function getBlog(slugOrId) {
  // Try slug first
  const bySlug = await fetch(
    `${PB_URL}/api/collections/blogs/records?filter=${encodeURIComponent(`slug='${slugOrId}'`)}&perPage=1`
  );
  if (bySlug.ok) {
    const data = await bySlug.json();
    if (data.items?.length > 0) return data.items[0];
  }
  // Fallback to PB record ID (backward compatibility)
  const byId = await fetch(`${PB_URL}/api/collections/blogs/records/${slugOrId}`);
  if (!byId.ok) throw new Error("Blog post not found");
  return byId.json();
}

export function getDownloadImageUrl(item) {
  if (!item?.image) return null;
  return `${PB_URL}/api/files/${item.collectionId}/${item.id}/${item.image}`;
}

export function getDownloadFileUrl(item) {
  if (item?.pdf_url) return item.pdf_url;
  if (item?.file) return `${PB_URL}/api/files/${item.collectionId}/${item.id}/${item.file}`;
  return null;
}

export async function getDownloads() {
  const res = await fetch(
    `${PB_URL}/api/collections/downloads/records?sort=-date&perPage=200`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to load downloads");
  return data.items || [];
}

export async function getDownloadItem(uuid) {
  const res = await fetch(`${PB_URL}/api/collections/downloads/records/${uuid}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export function getBlogCoverUrl(item) {
  if (item?.cover_url) return item.cover_url;
  if (item?.cover) return `${PB_URL}/api/files/blogs/${item.id}/${item.cover}`;
  return null;
}
