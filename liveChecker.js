import { getLive } from "@jkt48connect-corp/sdk";
import fs from "fs";

// Load API key dari config.json
const configPath = "./config.json";

if (!fs.existsSync(configPath)) {
  console.error("⚠️ File config.json tidak ditemukan! Harap buat file dan tambahkan API key.");
  process.exit(1);
}

const { apiKey } = JSON.parse(fs.readFileSync(configPath, "utf-8"));

if (!apiKey) {
  console.error("⚠️ API key tidak ditemukan dalam config.json.");
  process.exit(1);
}

async function fetchLiveMembers() {
  try {
    const liveMembers = await getLive(apiKey);
    
    if (!liveMembers || liveMembers.length === 0) {
      console.log("📢 Tidak ada member yang sedang live.");
      return;
    }

    console.log("🔴 Member yang sedang live:");
    liveMembers.forEach((member, index) => {
      console.log(`${index + 1}. ${member.name} - ${member.url}`);
    });
  } catch (error) {
    console.error("❌ Gagal mengambil data live:", error.message);
  }
}

// Jalankan fungsi
fetchLiveMembers();
