This is an example of how anchor fails to support cargo feature flags while cargo successfully removes instructions.

```
$ anchor build
BPF SDK: /home/vscode/.local/share/solana/install/releases/1.10.39/solana-release/bin/sdk/bpf
cargo-build-bpf child: rustup toolchain list -v
cargo-build-bpf child: cargo +bpf build --target bpfel-unknown-unknown --release
   Compiling cfg-issue v0.1.0 (/workspaces/test-bug-anchor/cfg-issue/programs/cfg-issue)
error[E0425]: cannot find function `do_not_include_me` in module `cfg_issue`
  --> programs/cfg-issue/src/lib.rs:14:12
   |
14 |     pub fn do_not_include_me(_ctx: Context<Initialize>) -> Result<()> {
   |            ^^^^^^^^^^^^^^^^^ not found in `cfg_issue`
   |
   = note: consider importing this function:
           crate::__private::__global::do_not_include_me

For more information about this error, try `rustc --explain E0425`.
error: could not compile `cfg-issue` due to previous error
```

```
$ anchor build -- --features new-feature
BPF SDK: /home/vscode/.local/share/solana/install/releases/1.10.39/solana-release/bin/sdk/bpf
Features: new-feature
cargo-build-bpf child: rustup toolchain list -v
cargo-build-bpf child: cargo +bpf build --target bpfel-unknown-unknown --release --features new-feature
   Compiling cfg-issue v0.1.0 (/workspaces/test-bug-anchor/cfg-issue/programs/cfg-issue)
    Finished release [optimized] target(s) in 0.64s
cargo-build-bpf child: /home/vscode/.local/share/solana/install/releases/1.10.39/solana-release/bin/sdk/bpf/scripts/strip.sh /workspaces/test-bug-anchor/cfg-issue/target/bpfel-unknown-unknown/release/cfg_issue.so /workspaces/test-bug-anchor/cfg-issue/target/deploy/cfg_issue.so
cargo-build-bpf child: /home/vscode/.local/share/solana/install/releases/1.10.39/solana-release/bin/sdk/bpf/dependencies/bpf-tools/llvm/bin/llvm-readelf --dyn-symbols /workspaces/test-bug-anchor/cfg-issue/target/deploy/cfg_issue.so

To deploy this program:
  $ solana program deploy /workspaces/test-bug-anchor/cfg-issue/target/deploy/cfg_issue.so
The program address will default to this keypair (override with --program-id):
  /workspaces/test-bug-anchor/cfg-issue/target/deploy/cfg_issue-keypair.json
```
