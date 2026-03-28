// mock API (backend not ready)

export const publishArticle = async (data) => {
  console.log("Mock publish:", data);
};

export const updateArticle = async (data) => {
  console.log("Mock update:", data);
};

export const getArticle = async (id) => {
  return {
    data: {
      id,
      author: "0xABC123",
      timestamp: "10:30 AM",
      content: "This is a dummy article"
    }
  };
};

export const getHistory = async (id) => {
  return {
    data: [
      { hash: "0x111", timestamp: "10:00 AM" },
      { hash: "0x222", timestamp: "11:00 AM" },
      { hash: "0x333", timestamp: "12:00 PM" }
    ]
  };
};