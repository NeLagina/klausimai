
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
  // welcome
  // blackout
  // 
  const dialogeJSON = { 1: "Hey", 2: "Ar nori sužinoti savo Matcha?", 3: "Ar tu esi Gejus?" }

  function NextDialoge() {

    SetDialoge(dialogeJSON[dialogeNR])

    SetDialogeNR(dialogeNR + 1)
    GETdovana()
  }

  function StartDialoge() {
    SetDialogeShow(true);
    NextDialoge()
  }

  function GETdovana() {
    if (dialogeNR == 4) {
      SetStage("dovana");
      SetDialogeShow(false);
    } else if (dialogeNR == 2) {
      SetDialogeTHING("2")

    }
  }

  function switchLights() {
    if (switch_State == switch_up) {
      SetSwitch_State(switch_down);
      const root = document.getElementById("root");
      root.classList.remove("bg-normal");
      root.classList.add("bg-blackout");
      setTimeout(() => {
        SetStage("blackout");
      }, 1000);
      setTimeout(() => {
        StartDialoge()
      }, 1500);
    }
  }

  function Yes() {
    if (dialogeNR === 2) {
      Setmatchas(true);
    }
    if (dialogeNR === 3) {
      SetGejus(true);
    }
    NextDialoge();
  }

  function No() {
    if (dialogeNR === 2) {
      Setmatchas(false);
    }
    if (dialogeNR === 3) {
      SetGejus(false);
    }
    NextDialoge();
  }


  function DISORDsend() {
    fetch("https://discord.com/api/webhooks/1498064876663341106/6aJCYNXYev2K0D_C-yBBKrfwj76Eaasf5JLLclCuwZxdRbtUSv_NtXxBit0vMHY7EBM4", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "QIUZ WEBSITE",
        avatar_url: "https://i.imgur.com/AfFp7pu.png",
        embeds: [
          {
            title: "Atsakymai",
            color: 0x00FF99,
            fields: [
              { name: "Matchas", value: Matchas ? "Ne" : "Taip", inline: true },
              { name: "Gejus", value: Gejus ? "Taip" : "Ne", inline: true }
            ],
            footer: { text: "YEp something" },
            timestamp: new Date().toISOString()
          }
        ]
      })
    });
  }



  function OpenDovana() {
    DISORDsend();
    SetStage("end")
  }

  return (
    <div className={`${styles.main} `}>
      {dialogeShow ?
        <>
          <div className={`${styles.dialoge}`}>{dialoge}</div>
          {DialogeTHING == "2" ? <>
            <div className={`${styles.Buttonselector} `}>
              <div onClick={() => Yes()} className={`${styles.buttonyes}`}>Taip</div>
              <div onClick={() => No()} className={`${styles.buttonno}`}>Ne</div>
            </div></>
            : null}
          {DialogeTHING == "1" ? <> <div onClick={() => NextDialoge()} className={`${styles.buttoncontinue} `}>Testi</div> </> :
            null}
        </> : null}
      {stage == "welcome" ? <>
        <div className={`${styles.title}`}> Išjunk šviesa </div>
        <div onClick={() => switchLights()} className={`${styles.switch}`}>
          <img src={switch_State} alt="switch UP" />
        </div>
      </> : null}
      {stage == "dovana" ? <>
        <div className={`${styles.title_dovana}`}> Paspausk ant dovanos kad atidaryti</div>
        <img onClick={() => OpenDovana()} className={`${styles.dovana}`} src={dovana} alt="dovana" />
      </> : null}
      {stage == "end" ? <>
        <div className={`${styles.title_tulpe}`}>Tavo matchas yra Šarūnas :O</div>
        <img className={`${styles.tulpes}`} src={asd} alt="" />
      </> : null}
    </div>
  )
}

export default Home
