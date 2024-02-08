import { createContext } from "react";
interface TokenType {
  token: string;
  setToken: (token: string) => void;
}
const AuthContext = createContext<TokenType | undefined>(undefined);
export default AuthContext;
