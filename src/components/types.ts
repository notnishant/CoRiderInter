export interface Chat {
    id: string;
    message: string;
    sender: {
      image: string;
      is_kyc_verified: boolean;
      self: boolean;
      user_id: string;
    };
    time: string;
  }
  
  export interface ApiResponse {
    chats: Chat[];
    from: string;
    message: string;
    name: string;
    status: string;
    to: string;
  }
  