const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// List of 12 public Ethereum addresses that are whitelisted
let addresses = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
];

// Hash addresses to get the leaves
let leaves = addresses.map((addr) => keccak256(addr));

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
// Get root
let rootHash = merkleTree.getRoot().toString("hex");

// Store this rootHash in the smart contract at the time of construction
console.log(rootHash);

// Send this proof in the parameters at the time of calling the mint function
let address = addresses[0];
let hashedAddress = keccak256(address);
let proof = merkleTree.getHexProof(hashedAddress);
console.log(proof);

// Check proof, just for demonstration, we'll do this in the contract
let v = merkleTree.verify(proof, hashedAddress, rootHash);
console.log(v); // returns true
