import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("NewsRegistry", function() {
  let newsRegistry;
  let owner, addr1;
  
  beforeEach(async function() {
    [owner, addr1] = await ethers.getSigners();
    const NewsRegistry = await ethers.getContractFactory("NewsRegistry");
    newsRegistry = await NewsRegistry.deploy();
    await newsRegistry.waitForDeployment();
  });
  
  it("should publish an article", async function() {
    const tx = await newsRegistry.publishNews("hash123");
    const article = await newsRegistry.getArticle(1);
    
    expect(article.contentHash).to.equal("hash123");
    expect(article.publisher).to.equal(owner.address);
  });
  
  it("should update an article", async function() {
    await newsRegistry.publishNews("hash123");
    await newsRegistry.updateNews(1, "hash456");
    
    const updated = await newsRegistry.getArticle(2);
    expect(updated.contentHash).to.equal("hash456");
    expect(updated.prevVersionId).to.equal(1);
  });
  
  it("should get article history", async function() {
    await newsRegistry.publishNews("hash123");
    await newsRegistry.updateNews(1, "hash456");
    
    const history = await newsRegistry.getHistory(1);
    expect(history.length).to.equal(2);
  });
  
  it("should track article count", async function() {
    expect(await newsRegistry.getArticleCount()).to.equal(0);
    await newsRegistry.publishNews("hash123");
    expect(await newsRegistry.getArticleCount()).to.equal(1);
  });
});
