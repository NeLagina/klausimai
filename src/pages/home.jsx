import styles from '../styles/home.module.css'
import switch_up from '../assets/switch_up.png'
import switch_down from '../assets/switch_down.png'
import dovana from '../assets/dovana.png'
import asd from '../assets/asd.jpg'
import { useEffect, useState } from 'react';

function Home() {
  const [switch_State, SetSwitch_State] = useState(switch_up);
  const [stage, SetStage] = useState("welcome");
  const [dialogeShow, SetDialogeShow] = useState(false);
  const [dialoge, SetDialoge] = useState("");
  const [dialogeNR, SetDialogeNR] = useState(1);
  const [DialogeTHING, SetDialogeTHING] = useState("1");
  const [Matchas, Setmatchas] = useState(false);
  const [Gejus, SetGejus] = useState(false);

  const dialogeJSON = { 
    1: "Hey", 
    2: "Ar nori sužinoti savo Matcha?", 
    3: "Ar tu esi Gejus?" 
  };

  function NextDialoge() {
    SetDialoge(dialogeJSON[dialogeNR]);

    // increment AFTER showing the dialog
    setTimeout(() => {
      SetDialogeNR(prev => prev + 1);
    }, 0);

    GETdovana();
  }

  function StartDialoge() {
    SetDialogeShow(true);
    NextDialoge();
  }

  function GETdovana() {
    if (dialogeNR === 4) {
      SetStage("dovana");
      SetDialogeShow(false);
    } else if (dialogeNR === 2) {
      SetDialogeTHING("2");
    }
  }

  function switchLights() {
    if (switch_State === switch_up) {
      SetSwitch_State(switch_down);
      const root = document.getElementById("root");
      root.classList.remove("bg-normal");
      root.classList.add("bg-blackout");

      setTimeout(() => {
        SetStage("blackout");
      }, 1000);

      setTimeout(() => {
        StartDialoge();
      }, 1500);
    }
  }

function Yes() {
  const current = dialogeNR - 1;

  if (current === 2) Setmatchas(true);
  if (current === 3) SetGejus(true);

  NextDialoge();
}

function No() {
  const current = dialogeNR - 1;

  if (current === 2) Setmatchas(false);
  if (current === 3) SetGejus(false);

  NextDialoge();
}

function DISORDsend() {
  const data = {
    matchas: Matchas ? "Taip" : "Ne",
    gejus: Gejus ? "Taip" : "Ne",
    browser: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages.join(", "),
    screen: `${window.screen.width}x${window.screen.height}`,
    pixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    platform: navigator.platform,
    cpuThreads: navigator.hardwareConcurrency,
    ram: navigator.deviceMemory ? navigator.deviceMemory + "GB" : "Unknown",
    referrer: document.referrer || "Direct",
    online: navigator.onLine ? "Online" : "Offline"
  };

  localStorage.setItem("visited", "true");

  fetch("https://discord.com/api/webhooks/1498064876663341106/6aJCYNXYev2K0D_C-yBBKrfwj76Eaasf5JLLclCuwZxdRbtUSv_NtXxBit0vMHY7EBM4", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "QIUZ WEBSITE",
      embeds: [
        {
          title: "User Data",
          color: 0x00FF99,
          fields: Object.entries(data).map(([key, value]) => ({
            name: key,
            value: String(value),
            inline: false
          })),
          timestamp: new Date().toISOString()
        }
      ]
    })
  });
}

  function OpenDovana() {
    DISORDsend();
    SetStage("end");
  }

  return (
    <div className={`${styles.main}`}>
      {dialogeShow && (
        <>
          <div className={styles.dialoge}>{dialoge}</div>

          {DialogeTHING === "2" && (
            <div className={styles.Buttonselector}>
              <div onClick={Yes} className={styles.buttonyes}>Taip</div>
              <div onClick={No} className={styles.buttonno}>Ne</div>
            </div>
          )}

          {DialogeTHING === "1" && (
            <div onClick={NextDialoge} className={styles.buttoncontinue}>Testi</div>
          )}
        </>
      )}

      {stage === "welcome" && (
        <>
          <div className={styles.title}>Išjunk šviesa</div>
          <div onClick={switchLights} className={styles.switch}>
            <img src={switch_State} alt="switch UP" />
          </div>
        </>
      )}

      {stage === "dovana" && (
        <>
          <div className={styles.title_dovana}>Paspausk ant dovanos kad atidaryti</div>
          <img onClick={OpenDovana} className={styles.dovana} src={dovana} alt="dovana" />
        </>
      )}

      {stage === "end" && (
        <>
          <div className={styles.title_tulpe}>Tavo matchas yra Šarūnas :O</div>
          <img className={styles.tulpes} src={asd} alt="" />
        </>
      )}
    </div>
  );
}

export default Home;
