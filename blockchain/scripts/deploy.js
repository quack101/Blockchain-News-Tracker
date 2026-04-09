import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const { ethers } = hre;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    // Deploy NewsRegistry contract
    const NewsRegistry = await ethers.getContractFactory("NewsRegistry");
    const newsRegistry = await NewsRegistry.deploy();
    
    // Wait for deployment confirmation
    await newsRegistry.waitForDeployment();
    
    // Extract contract address
    const address = await newsRegistry.getAddress();
    
    // Save contract address to file
    const addressFilePath = path.join(__dirname, "../deployed-address.txt");
    const addressDir = path.dirname(addressFilePath);
    
    // Ensure directory exists
    if (!fs.existsSync(addressDir)) {
      fs.mkdirSync(addressDir, { recursive: true });
    }
    
    // Write only the address string without formatting
    fs.writeFileSync(addressFilePath, address);
    
    console.log(`NewsRegistry deployed to: ${address}`);
    process.exit(0);
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

main();
