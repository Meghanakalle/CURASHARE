import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, RefreshCw, Eye, Sparkles, CheckCircle2, ShieldCheck, Cpu, FileText } from 'lucide-react';

interface CuraBox3DProps {
  mode?: 'kiosk' | 'pill_box' | 'paper';
  interactive?: boolean;
}

export const CuraBox3D: React.FC<CuraBox3DProps> = ({ mode = 'kiosk', interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'kiosk' | 'pill_box' | 'paper'>(mode);
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(mode);
  }, [mode]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const lidMeshRef = useRef<THREE.Mesh | null>(null);
  const laserMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 380;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900 background
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3.5, 2.5, 4.5);
    camera.lookAt(0, 0.5, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x10b981, 1.5); // Emerald light
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueLight = new THREE.DirectionalLight(0x3b82f6, 1.2); // Cyan/Blue light
    blueLight.position.set(-5, 4, -5);
    scene.add(blueLight);

    const pointLight = new THREE.PointLight(0x34d399, 2, 10);
    pointLight.position.set(0, 2, 1);
    scene.add(pointLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x10b981, 0x334155);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // 5. Build 3D Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    if (activeTab === 'kiosk') {
      buildSmartKiosk(modelGroup);
    } else if (activeTab === 'pill_box') {
      buildMedicinePack(modelGroup);
    } else {
      buildPaperScan(modelGroup);
    }

    // 6. Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (modelGroupRef.current) {
        modelGroupRef.current.rotation.y = elapsedTime * 0.3;
      }

      // Scanner laser wave animation
      if (laserMeshRef.current && isScanning) {
        laserMeshRef.current.position.y = Math.sin(elapsedTime * 8) * 0.4 + 0.8;
        (laserMeshRef.current.material as THREE.MeshBasicMaterial).opacity = 0.8 + Math.sin(elapsedTime * 12) * 0.2;
      }

      // Lid open/close animation
      if (lidMeshRef.current) {
        const targetRotX = isLidOpen ? -Math.PI / 3 : 0;
        lidMeshRef.current.rotation.x = THREE.MathUtils.lerp(lidMeshRef.current.rotation.x, targetRotX, 0.1);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize listener
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeTab, isLidOpen, isScanning]);

  // Build 3D CuraBox Kiosk Model
  const buildSmartKiosk = (group: THREE.Group) => {
    // Kiosk Body Frame
    const bodyGeo = new THREE.BoxGeometry(1.6, 2.4, 1.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f2922, // Dark Emerald
      roughness: 0.3,
      metalness: 0.8,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 1.2;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    group.add(bodyMesh);

    // Front Accent Panel (White/Mint)
    const panelGeo = new THREE.BoxGeometry(1.4, 2.2, 0.05);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0xf0fdf4,
      roughness: 0.2,
    });
    const panelMesh = new THREE.Mesh(panelGeo, panelMat);
    panelMesh.position.set(0, 1.2, 0.61);
    group.add(panelMesh);

    // Smart Touchscreen Display Screen
    const screenGeo = new THREE.PlaneGeometry(1.0, 0.6);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7, // Bright cyan
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.8, 0.64);
    group.add(screenMesh);

    // Digital UI Frame on screen
    const uiGeo = new THREE.PlaneGeometry(0.9, 0.5);
    const uiMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
    });
    const uiMesh = new THREE.Mesh(uiGeo, uiMat);
    uiMesh.position.set(0, 1.8, 0.65);
    group.add(uiMesh);

    // Drop Slot Frame
    const slotFrameGeo = new THREE.BoxGeometry(1.0, 0.35, 0.1);
    const slotFrameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
    const slotFrameMesh = new THREE.Mesh(slotFrameGeo, slotFrameMat);
    slotFrameMesh.position.set(0, 1.0, 0.62);
    group.add(slotFrameMesh);

    // Drop Slot Lid Door (Rotatable)
    const lidGeo = new THREE.BoxGeometry(0.96, 0.3, 0.04);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.1, metalness: 0.5 });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.set(0, 1.0, 0.64);
    lidMeshRef.current = lidMesh;
    group.add(lidMesh);

    // AI Scanner Laser Beam Line
    const laserGeo = new THREE.PlaneGeometry(0.9, 0.02);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // Red laser
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, 1.0, 0.66);
    laserMeshRef.current = laserMesh;
    group.add(laserMesh);

    // Status LED Light Rings
    const ledGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.rotation.x = Math.PI / 2;
    ledMesh.position.set(0.55, 2.1, 0.64);
    group.add(ledMesh);

    // Base Stand
    const baseGeo = new THREE.BoxGeometry(1.8, 0.15, 1.4);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.075;
    group.add(baseMesh);
  };

  // Build 3D Medicine Pack & Pill Model
  const buildMedicinePack = (group: THREE.Group) => {
    // Blister Foil Pack
    const packGeo = new THREE.BoxGeometry(1.8, 0.08, 1.2);
    const packMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db, // Silver metallic foil
      metalness: 0.9,
      roughness: 0.2,
    });
    const packMesh = new THREE.Mesh(packGeo, packMat);
    packMesh.position.y = 1.0;
    group.add(packMesh);

    // Pills grid on blister
    const pillGeo = new THREE.SphereGeometry(0.12, 16, 16);
    pillGeo.scale(1.4, 0.8, 1.0); // Pill shape
    const pillMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald medicine capsule
      roughness: 0.1,
    });

    for (let x = -0.6; x <= 0.6; x += 0.4) {
      for (let z = -0.35; z <= 0.35; z += 0.7) {
        const pill = new THREE.Mesh(pillGeo, pillMat);
        pill.position.set(x, 1.1, z);
        group.add(pill);
      }
    }

    // Outer Medicine Box
    const boxGeo = new THREE.BoxGeometry(1.2, 1.6, 0.8);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xecfdf5,
      roughness: 0.4,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    boxMesh.position.set(-0.8, 1.0, -0.4);
    boxMesh.rotation.y = Math.PI / 6;
    group.add(boxMesh);

    // AI Hologram Scan Cylinder
    const scanGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.8, 32, 1, true);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const scanMesh = new THREE.Mesh(scanGeo, scanMat);
    scanMesh.position.y = 1.0;
    group.add(scanMesh);

    // AI Scanner Laser Beam Line (for moving animation)
    const laserGeo = new THREE.PlaneGeometry(1.6, 0.03);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x10b981, // Green laser line
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, 1.0, 0.61);
    laserMeshRef.current = laserMesh;
    group.add(laserMesh);
  };

  // Build 3D Prescription Paper Model
  const buildPaperScan = (group: THREE.Group) => {
    // 1. Prescription Paper Sheet
    const paperGeo = new THREE.BoxGeometry(1.2, 1.6, 0.02);
    const paperMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, // White paper
      roughness: 0.8,
      metalness: 0.1,
    });
    const paperMesh = new THREE.Mesh(paperGeo, paperMat);
    paperMesh.position.y = 1.0;
    paperMesh.castShadow = true;
    paperMesh.receiveShadow = true;
    group.add(paperMesh);

    // 2. Doctor Rx Header / Logo Banner
    const headerGeo = new THREE.PlaneGeometry(1.0, 0.2);
    const headerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7, // Cyan/Blue header banner
      side: THREE.DoubleSide,
    });
    const headerMesh = new THREE.Mesh(headerGeo, headerMat);
    headerMesh.position.set(0, 1.6, 0.015);
    group.add(headerMesh);

    // 3. Rx symbol (a small red cross)
    const rxGeo = new THREE.PlaneGeometry(0.12, 0.12);
    const rxMat = new THREE.MeshBasicMaterial({
      color: 0xef4444, // Red cross
      side: THREE.DoubleSide,
    });
    const rxMesh = new THREE.Mesh(rxGeo, rxMat);
    rxMesh.position.set(-0.4, 1.35, 0.015);
    group.add(rxMesh);

    // 4. Text lines (representing prescription text)
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x64748b, // Slate-500 text color
      side: THREE.DoubleSide,
    });

    const linesY = [1.35, 1.25, 1.15, 1.05, 0.95, 0.85, 0.75, 0.65, 0.55, 0.45];
    linesY.forEach((y, index) => {
      if (y === 1.35) {
        // Shorter line next to Rx symbol
        const lineGeo = new THREE.PlaneGeometry(0.6, 0.02);
        const lineMesh = new THREE.Mesh(lineGeo, lineMat);
        lineMesh.position.set(0.1, y, 0.015);
        group.add(lineMesh);
      } else {
        // Regular line
        const width = 0.8 - (index % 3) * 0.1;
        const lineGeo = new THREE.PlaneGeometry(width, 0.02);
        const lineMesh = new THREE.Mesh(lineGeo, lineMat);
        lineMesh.position.set(0, y, 0.015);
        group.add(lineMesh);
      }
    });

    // 5. Signature / Doctor stamp
    const stampGeo = new THREE.RingGeometry(0.06, 0.08, 16);
    const stampMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, // Bright blue stamp
      side: THREE.DoubleSide,
    });
    const stampMesh = new THREE.Mesh(stampGeo, stampMat);
    stampMesh.position.set(0.35, 0.4, 0.015);
    group.add(stampMesh);

    // 6. AI Hologram/Laser Scan Cylinder/Cone
    const scanGeo = new THREE.CylinderGeometry(1.0, 1.0, 1.8, 32, 1, true);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan scan beam
      transparent: true,
      opacity: 0.2,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const scanMesh = new THREE.Mesh(scanGeo, scanMat);
    scanMesh.position.y = 1.0;
    group.add(scanMesh);

    // 7. Scanner Laser Beam Line (for moving animation)
    const laserGeo = new THREE.PlaneGeometry(1.1, 0.03);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan laser line
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.set(0, 1.0, 0.02); // Just in front of the paper
    laserMeshRef.current = laserMesh;
    group.add(laserMesh);
  };

  const handleTestScan = () => {
    setIsScanning(true);
    setIsLidOpen(true);
    setScanStatus(activeTab === 'paper' ? 'AI OCR Prescription Scan in Progress...' : 'AI OCR & Expiry Scan in Progress...');

    setTimeout(() => {
      setScanStatus(activeTab === 'paper' 
        ? 'Reading doctor signature, hospital credentials and medication list...' 
        : 'Scanning Label: "Paracetamol 500mg - Expiry: 2027-04"');
    }, 1200);

    setTimeout(() => {
      setScanStatus(activeTab === 'paper' 
        ? '✅ AI VERIFIED: Prescription Authenticity Approved. Dispatch Authorized.' 
        : '✅ AI VERIFIED: Expiry > 90 Days. Deposit Authorized.');
      setIsScanning(false);
    }, 2800);
  };

  const getHeaderInfo = () => {
    switch (activeTab) {
      case 'kiosk':
        return {
          title: 'CuraBox Kiosk',
          desc: 'Interactive WebGL AI Medicine Drop Kiosk Model',
          themeColor: 'bg-emerald-500/20 text-emerald-400',
          borderColor: 'border-emerald-500/40',
          textColor: 'text-emerald-400',
          toastBg: 'border-emerald-500/50 text-emerald-300',
        };
      case 'pill_box':
        return {
          title: 'AI Medicine Scanner',
          desc: 'Interactive 3D Medicine Scan & Quality Inspection',
          themeColor: 'bg-emerald-500/20 text-emerald-400',
          borderColor: 'border-emerald-500/40',
          textColor: 'text-emerald-400',
          toastBg: 'border-emerald-500/50 text-emerald-300',
        };
      case 'paper':
        return {
          title: 'AI Prescription Verification',
          desc: 'Interactive 3D Prescription Scan & Authenticity Check',
          themeColor: 'bg-cyan-500/20 text-cyan-400',
          borderColor: 'border-cyan-500/40',
          textColor: 'text-cyan-400',
          toastBg: 'border-cyan-500/50 text-cyan-300',
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4 text-white">
      {/* Top Header & View Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${headerInfo.themeColor}`}>
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{headerInfo.title}</h3>
            <p className="text-xs text-slate-400">{headerInfo.desc}</p>
          </div>
        </div>

        {mode === 'kiosk' && (
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('kiosk'); setScanStatus(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'kiosk'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              CuraBox
            </button>
            <button
              onClick={() => { setActiveTab('pill_box'); setScanStatus(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'pill_box'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              3D Medicine Pack
            </button>
            <button
              onClick={() => { setActiveTab('paper'); setScanStatus(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'paper'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Prescription Paper
            </button>
          </div>
        )}
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative w-full h-[320px] rounded-xl overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Floating AI Scan Overlay badge */}
        <div className={`absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border ${headerInfo.borderColor} rounded-lg px-3 py-1.5 text-xs ${headerInfo.textColor} flex items-center gap-2`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
          </span>
          3D Rendering: <span className="font-mono text-white">Interactive WebGL</span>
        </div>

        {/* Scan Status Toast in 3D canvas */}
        {scanStatus && (
          <div className={`absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md border ${headerInfo.toastBg} rounded-xl p-3 text-xs text-slate-200 flex items-center gap-3 shadow-2xl`}>
            <div className={`p-2 bg-slate-800 rounded-lg shrink-0 ${headerInfo.textColor}`}>
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            </div>
            <div className="flex-1 font-medium">{scanStatus}</div>
          </div>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Eye className="w-4 h-4 text-emerald-400" />
          <span>Drag to rotate model 360°</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLidOpen(!isLidOpen)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700 flex items-center gap-1.5"
          >
            {isLidOpen ? 'Close Drop Slot' : 'Open Drop Slot'}
          </button>

          <button
            onClick={handleTestScan}
            disabled={isScanning}
            className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simulate AI OCR Scan
          </button>
        </div>
      </div>
    </div>
  );
};
