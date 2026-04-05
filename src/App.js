import React from 'react';
import { create } from 'zustand';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Exo 2', sans-serif;
    background: #0a0a1a; /* Deep Cyberpunk Blue */
    color: #fff;
    overflow: hidden;
  }
`;

// --- State ---
const useStore = create((set) => ({
  index: 0,
  collected: [],
  dinos: [
    {
      id: 'rex',
      name: "NEO-REX",
      type: "Fire Type",
      color: "#ff3e3e",
      glow: "rgba(255, 62, 62, 0.5)",
      description: "A digital predator born from overclocked fossil data.",
      power: "SS"
    },
    {
      id: 'tri',
      name: "SHIELD-TRI",
      type: "Electric Type",
      color: "#3effd4",
      glow: "rgba(62, 255, 212, 0.5)",
      description: "Equipped with a high-frequency vibration frill.",
      power: "S+"
    }
  ],
  next: () => set((state) => ({ index: (state.index + 1) % state.dinos.length })),
  prev: () => set((state) => ({ index: (state.index - 1 + state.dinos.length) % state.dinos.length })),
  collect: (id) => set((state) => ({ 
    collected: state.collected.includes(id) ? state.collected : [...state.collected, id] 
  }))
}));

// --- Anime CSS Components ---
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; filter: blur(40px); }
  50% { opacity: 1; filter: blur(60px); }
`;

const DinoContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 4s ease-in-out infinite;
`;

const Aura = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${props => props.color};
  filter: blur(50px);
  z-index: -1;
  animation: ${pulse} 3s infinite;
`;

// Stylized Anime T-Rex Head
const NeoRex = styled.div`
  width: 300px;
  height: 250px;
  background: ${props => props.color};
  /* The "Anime Jaw" Shape */
  clip-path: polygon(0% 20%, 60% 0%, 100% 10%, 100% 60%, 70% 50%, 80% 100%, 20% 100%, 10% 70%);
  position: relative;
  border: 4px solid #fff;

  &::after { /* The Eye */
    content: '';
    position: absolute;
    top: 25%; right: 20%;
    width: 40px; height: 15px;
    background: #fff;
    clip-path: polygon(0% 50%, 100% 0%, 80% 50%, 100% 100%);
    box-shadow: 0 0 20px #fff;
  }

  &::before { /* The Teeth */
    content: '';
    position: absolute;
    bottom: 20%; left: 30%;
    width: 100px; height: 30px;
    background: #fff;
    clip-path: polygon(0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%);
  }
`;

// Stylized Anime Triceratops
const ShieldTri = styled.div`
  width: 320px;
  height: 280px;
  background: ${props => props.color};
  /* The "Frill + Horns" Shape */
  clip-path: polygon(0% 60%, 20% 20%, 10% 0%, 40% 10%, 50% 0%, 60% 10%, 90% 0%, 80% 20%, 100% 60%, 50% 100%);
  position: relative;
  border: 4px solid #fff;

  &::after { /* Glowing Eyes */
    content: '';
    position: absolute;
    top: 50%; left: 20%;
    width: 60px; height: 10px;
    background: #fff;
    box-shadow: 0 0 30px #fff;
    transform: rotate(-10deg);
  }
`;

// --- UI Components ---
const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #1a1a3a 0%, #050505 100%);
`;

const Card = styled.div`
  position: absolute;
  bottom: 50px;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-left: 5px solid ${props => props.color};
  border-radius: 0 20px 20px 0;
`;

const NavBtn = styled.button`
  position: fixed;
  top: 50%;
  ${props => props.right ? 'right: 30px;' : 'left: 30px;'}
  background: none;
  border: 2px solid #fff;
  color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover { background: #fff; color: #000; }
`;

export default function App() {
  const { index, dinos, next, prev, collect, collected } = useStore();
  const active = dinos[index];

  return (
    <Layout>
      <GlobalStyle />
      
      <NavBtn onClick={prev}>PREV</NavBtn>
      <NavBtn right onClick={next}>NEXT</NavBtn>

      <DinoContainer>
        <Aura color={active.glow} />
        {active.id === 'rex' ? (
          <NeoRex color={active.color} />
        ) : (
          <ShieldTri color={active.color} />
        )}
      </DinoContainer>

      <Card color={active.color}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ margin: 0, color: active.color, letterSpacing: '2px' }}>{active.type}</h4>
            <h1 style={{ margin: '5px 0', fontSize: '3rem', fontWeight: '900' }}>{active.name}</h1>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>{active.power}</div>
        </div>
        <p style={{ opacity: 0.7, lineHeight: '1.6' }}>{active.description}</p>
        
        <button 
          onClick={() => collect(active.id)}
          style={{
            marginTop: '20px',
            padding: '12px 30px',
            background: collected.includes(active.id) ? '#333' : active.color,
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
            cursor: 'pointer'
          }}
        >
          {collected.includes(active.id) ? 'DATA SECURED' : 'INITIATE CAPTURE'}
        </button>
      </Card>

      {/* Progress Tracker */}
      <div style={{ position: 'fixed', top: '40px', display: 'flex', gap: '10px' }}>
        {dinos.map((d, i) => (
          <div key={d.id} style={{
            width: '40px', height: '6px', 
            background: i === index ? active.color : '#222',
            transition: '0.3s'
          }} />
        ))}
      </div>
    </Layout>
  );
}
