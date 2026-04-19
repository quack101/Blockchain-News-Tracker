import { useState, useEffect } from "react";

function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if already connected on mount
  useEffect(() => {
    checkConnection();
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (err) {
        console.error("Error checking connection:", err);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed! Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Connection error:", err);
      if (err.code === 4001) {
        alert("Connection rejected. Please approve MetaMask to continue.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const shortenAddress = (addr) => {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  return (
    <div style={styles.container}>
      <div style={styles.walletInfo}>
        <span style={styles.icon}>🦊</span>
        {account ? (
          <div style={styles.connected}>
            <div style={styles.statusDot} />
            <span style={styles.address}>
              {shortenAddress(account)}
            </span>
            <button
              onClick={disconnectWallet}
              style={styles.disconnectBtn}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              ...styles.connectBtn,
              opacity: isConnecting ? 0.7 : 1,
            }}
          >
            {isConnecting ? "Connecting..." : "Connect MetaMask"}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    border: "1px solid #38bdf8",
    borderRadius: "12px",
    padding: "15px 20px",
    marginBottom: "20px",
  },
  walletInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  icon: {
    fontSize: "24px",
  },
  connected: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#22c55e",
    boxShadow: "0 0 6px #22c55e",
  },
  address: {
    color: "#e2e8f0",
    fontFamily: "monospace",
    fontSize: "14px",
    background: "#0f172a",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #334155",
  },
  connectBtn: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px",
  },
  disconnectBtn: {
    background: "transparent",
    color: "#ef4444",
    border: "1px solid #ef4444",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "12px",
    marginLeft: "auto",
  },
};

export default WalletConnect;
