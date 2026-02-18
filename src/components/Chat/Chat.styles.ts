import styled from "styled-components";

// ── Sidebar ────────────────────────────────────────────────
export const Sidebar = styled.aside`
  width: 35vw;
  //min-width: 400px;
  background: #0b0d18;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #181b2c;
  position: relative;
  z-index: 10;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 18px 13px;
  border-bottom: 1px solid #181b2c;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoText = styled.span`
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.3px;

  em {
    font-weight: 300;
    font-style: normal;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const HeaderBtn = styled.button`
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5a5e7a;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: #aaa;
    border-color: #363a58;
  }
`;

export const ModelRow = styled.div`
  padding: 10px 18px;
  border-bottom: 1px solid #181b2c;
`;

export const ModelPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 20px;
  padding: 5px 13px;
  color: #bbb;
  font-size: 13px;
  cursor: pointer;
`;

export const CtrlRow = styled.div`
  padding: 8px 18px;
  border-bottom: 1px solid #181b2c;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const CtrlPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 14px;
  padding: 4px 10px;
  color: #777;
  font-size: 12px;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;
`;

export const EmptyRing = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-size: 24px;
`;

export const EmptyTitle = styled.p`
  color: #dde;
  font-weight: 600;
  font-size: 14px;
`;

export const EmptySub = styled.p`
  color: #404460;
  font-size: 12.5px;
  text-align: center;
  line-height: 1.5;
`;

export const InputArea = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #181b2c;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 12px;
  padding: 9px 14px;
  gap: 10px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #22c55e33;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #ccc;
    font-size: 13.5px;
    font-family: inherit;

    &::placeholder {
      color: #363852;
    }
  }
`;

export const SendBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #22c55e;
  padding: 0;
  display: flex;
`;