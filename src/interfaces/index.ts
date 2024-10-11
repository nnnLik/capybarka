interface UserDTO {
  id: number;
  username: string;
  email: string;
  avatar_uri: string;
  created_at: string;
}

interface AuthResponse {
  access: string;
  u_id: number;
  u_avatar: string;
  u_name: string;
  u_email: string;
}

interface UserServersDTO {
  result: UserServerDetailDTO[];
  count_of_servers: number;
}

interface UserServerDetailDTO {
  id: number;
  name: string;
  admin_id: string;
  image: string | null;
  members: UserDTO[];
  count_of_members: number;
  count_of_online_members: number;
}
