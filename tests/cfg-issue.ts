import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CfgIssue } from "../target/types/cfg_issue";

describe("cfg-issue", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CfgIssue as Program<CfgIssue>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
