import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import styled, { createGlobalStyle, keyframes, css } from 'styled-components';

// --- Global Theme & Reset ---
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syncopate:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background: #010103;
    color: #fff;
    font-family: 'Space Mono', monospace;
    overflow: hidden;
    user-select: none;
  }
`;

// --- State Management ---
const useStore = create(
  persist(
    (set) => ({
      index: 0,
      collected: [],
      dinos: [
        {
          id: 'rex',
          name: "V-REX .01",
          class: "APEX_PREDATOR",
          color: "#ff004c",
          description: "Neural-linked fossil data suggests a bite force capable of crushing titanium alloys.",
          stats: { atk: 98, spd: 82, nrg: 65 }
        },
        {
          id: 'tri',
          name: "TRI-PLATE .03",
          class: "HEAVY_DEFENSE",
          color: "#00f7ff",
          description: "Sub-dermal plating acts as a kinetic battery, storing impact energy for counter-discharges.",
          stats: { atk: 60, spd: 45, nrg: 95 }
        }
      ],
      setNext: () => set((state) => ({ index: (state.index + 1) % state.dinos.length })),
      setPrev: () => set((state) => ({ index: (state.index - 1 + state.dinos.length) % state.dinos.length })),
      toggleCollect: (id) => set((state) => ({
        collected: state.collected.includes(id) 
          ? state.collected.filter(i => i !== id) 
          : [...state.collected, id]
      }))
    }),
    { name: 'paleo-os-cache' }
  )
);

// --- Animations ---
const scanMove = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(500%); }
`;

const glitchAnim = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-3px, 3px); }
  40% { transform: translate(-3px, -3px); }
  60% { transform: translate(3px, 3px); }
  80% { transform: translate(3px, -3px); }
  100% { transform: translate(0); }
`;

// --- Styled Components ---
const Stage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, ${props => props.glow}15 0%, #010103 100%);
  transition: background 1s ease;
  position: relative;
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image: linear-gradient(${props => props.color}08 1px, transparent 1px),
                    linear-gradient(90deg, ${props => props.color}08 1px, transparent 1px);
  background-size: 40px 40px;
  perspective: 1000px;
  transform: rotateX(60deg) translateY(-150px);
  opacity: 0.6;
`;

const DinoContainer = styled.div.attrs(props => ({
  style: {
    transform: `rotateX(${props.ry}deg) rotateY(${props.rx}deg)`,
  },
}))`
  position: relative;
  width: 500px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease-out;
  pointer-events: none;

  /* The Glitch Logic Fix */
  ${props => props.isGlitching && css`
    animation: ${glitchAnim} 0.15s infinite;
  `}
`;

const ModelBase = styled.div`
  background: ${props => props.color};
  box-shadow: 0 0 50px ${props => props.color}44;
  border: 1px solid #fff;
  position: relative;
  transition: all 0.4s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 4px;
    background: #fff;
    opacity: 0.5;
    animation: ${scanMove} 2.5s linear infinite;
    box-shadow: 0 0 10px #fff;
  }
`;

const RexModel = styled(ModelBase)`
  width: 340px;
  height: 240px;
  clip-path: polygon(0% 25%, 70% 5%, 100% 20%, 100% 75%, 80% 65%, 85% 100%, 25% 100%, 15% 85%);
  &::after {
    content: ''; position: absolute; top: 35%; right: 18%; width: 50px; height: 8px;
    background: #fff; clip-path: polygon(0 50%, 100% 0, 80% 50%, 100% 100%);
  }
`;

const TriModel = styled(ModelBase)`
  width: 360px;
  height: 280px;
  clip-path: polygon(15% 80%, 25% 35%, 0% 5%, 45% 20%, 50% 5%, 55% 20%, 100% 5%, 75% 35%, 85% 80%, 50% 100%);
  &::after {
    content: ''; position: absolute; top: 60%; left: 22%; width: 40px; height: 6px;
    background: #fff; transform: rotate(-12deg);
  }
`;

const UIElement = styled.div`
  position: absolute;
  pointer-events: auto;
`;

const Sidebar = styled(UIElement)`
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  width: 280px;
`;

const StatBar = styled.div`
  margin-bottom: 20px;
  label { font-size: 0.55rem; letter-spacing: 2px; opacity: 0.4; display: block; }
  .track { 
    height: 3px; background: rgba(255,255,255,0.05); margin-top: 6px; position: relative; 
    &::after {
      content: ''; position: absolute; left: 0; top: 0; height: 100%;
      width: ${props => props.val}%;
      background: ${props => props.color};
      transition: width 1.2s cubic-bezier(0.23, 1, 0.32, 1);
    }
  }
`;

const Header = styled(UIElement)`
  top: 60px;
  left: 60px;
  font-family: 'Syncopate', sans-serif;
  h2 { margin: 0; font-size: 2.2rem; color: ${props => props.color}; letter-spacing: -2px; }
  span { font-size: 0.65rem; letter-spacing: 4px; opacity: 0.4; }
`;

const Controls = styled(UIElement)`
  right: 60px;
  bottom: 60px;
  display: flex;
  gap: 15px;
`;

const SquareBtn = styled.button`
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  padding: 15px 25px;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.7rem;
  letter-spacing: 2px;
  transition: 0.2s;
  &:hover { background: #fff; color: #000; border-color: #fff; }
`;

// --- Main App ---
export default function App() {
  const { index, dinos, setNext, setPrev, toggleCollect, collected } = useStore();
  const active = dinos[index];
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  // Smooth mouse tracking
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 35,
        y: (e.clientY / window.innerHeight - 0.5) * -35
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleNavigation = (direction) => {
    setIsGlitching(true);
    setTimeout(() => {
      direction === 'next' ? setNext() : setPrev();
      setIsGlitching(false);
    }, 200);
  };

  const isSync = collected.includes(active.id);

  return (
    <Stage glow={active.color}>
      <GlobalStyle />
      <Grid color={active.color} />

      <Header color={active.color}>
        <span>ARCHIVE_SEQ_{index + 1}</span>
        <h2>{active.name}</h2>
      </Header>

      <Sidebar>
        <p style={{ fontSize: '0.75rem', lineHeight: '1.7', opacity: 0.6, marginBottom: '30px' }}>
          {active.description}
        </p>
        
        <StatBar val={active.stats.atk} color={active.color}><label>POTENTIAL_OUTPUT</label><div className="track" /></StatBar>
        <StatBar val={active.stats.spd} color={active.color}><label>REACTION_NODE</label><div className="track" /></StatBar>
        <StatBar val={active.stats.nrg} color={active.color}><label>CORE_STABILITY</label><div className="track" /></StatBar>

        <button 
          onClick={() => toggleCollect(active.id)}
          style={{
            marginTop: '30px', padding: '12px', width: '100%',
            background: isSync ? 'transparent' : '#fff',
            color: isSync ? '#fff' : '#000',
            border: '1px solid #fff', cursor: 'pointer', fontWeight: 'bold',
            fontSize: '0.7rem', letterSpacing: '1px'
          }}
        >
          {isSync ? '[ DATA_LOCKED ]' : 'INIT_NEURAL_SYNC'}
        </button>
      </Sidebar>

      <DinoContainer rx={mouse.x} ry={mouse.y} isGlitching={isGlitching}>
        {active.id === 'rex' ? (
          <RexModel color={active.color} />
        ) : (
          <TriModel color={active.color} />
        )}
      </DinoContainer>

      <Controls>
        <SquareBtn onClick={() => handleNavigation('prev')}>&lt; PREV</SquareBtn>
        <SquareBtn onClick={() => handleNavigation('next')}>NEXT &gt;</SquareBtn>
      </Controls>

      <div style={{ position: 'fixed', bottom: '30px', left: '60px', fontSize: '0.55rem', opacity: 0.3 }}>
        SYS_STATUS: {isGlitching ? 'RE-INDEXING...' : 'IDLE'} // BANDWIDTH: 1.2GBPS // LOC: EL_MOUROUJ_TUNISIA
      </div>
    </Stage>
  );
}