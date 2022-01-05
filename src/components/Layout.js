import '../styles/Layout.css';
import logo from '../assets/logofish.png';
import { Link } from "react-router-dom";
import { fishingItem } from '../datas/fishingItem';
import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Layout() {

    const [baitIsChecked, setBaitIsChecked] = useState(fishingItem);
    const [rodIsChecked, setRodIsChecked] = useState(fishingItem);
    const [lineIsChecked, setLineIsChecked] = useState(fishingItem);
    const [powerBait, setpowerBait] = useState([]);
    const [powerRod, setpowerRod] = useState([]);
    const [powerLine, setpowerLine] = useState([]);
    const [fishing, isFishing] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [fishPowerWeight, isFishPowerWeight] = useState("");
    const [fishPowerTall, isFishPowerTall] = useState("");
    const powerBaitTest = powerBait[powerBait.length -1];
    const powerRodTest = powerRod[powerRod.length -1];
    const powerLineTest = powerLine[powerLine.length -1];
    const totalPower = powerBaitTest + powerRodTest + powerLineTest;

    function handleChangeBait(e) {
        const value = e.target.value;
        const modifiedData = [...baitIsChecked];
        modifiedData.map((item) => {
          item.baitChecked = item.id === value;
          if (item.baitChecked === true) {
            setpowerBait(arr => [...arr, item.power])
          }
          return item;
        });
        setBaitIsChecked(modifiedData);
      }

    function handleChangeRod(e) {
      const value = e.target.value;
      const modifiedData = [...rodIsChecked];
      modifiedData.map((item) => {
        item.rodChecked = item.id === value;
        if (item.rodChecked === true) {
          setpowerRod(arr => [...arr, item.power])
        }
        return item;
      });
      setRodIsChecked(modifiedData);
    }

    function handleChangeLine(e) {
      const value = e.target.value;
      const modifiedData = [...lineIsChecked];
      modifiedData.map((item) => {
        item.lineChecked = item.id === value;
        if (item.lineChecked === true) {
          setpowerLine(arr => [...arr, item.power])
        }
        return item;
      });
      setLineIsChecked(modifiedData);
    }

    function refreshPage() {
      window.location.reload(false);
    }

    function toFishWeight () {
      if (totalPower <= 4) {
        return isFishPowerWeight(Math.floor(Math.random() * 2) + "," + Math.floor(Math.random() * 1000) + "kg")
      } else if (totalPower > 4 && totalPower <= 8) {
        return isFishPowerWeight(Math.floor(Math.random() * 5)+2 + "," + Math.floor(Math.random() * 1000) + "kg")
      } else if (totalPower > 8) {
        return isFishPowerWeight(Math.floor(Math.random() * 7)+4 + "," + Math.floor(Math.random() * 1000) + "kg")
      }
    }

    function toFishTall () {
      if (totalPower <= 4) {
        return isFishPowerTall(Math.floor(Math.random() * 40)+15 + "cm")
      } else if (totalPower > 4 && totalPower <= 8) {
        return isFishPowerTall(Math.floor(Math.random() * 55)+30 + "cm")
      } else if (totalPower > 8) {
        return isFishPowerTall(Math.floor(Math.random() * 85)+70 + "cm")
      }
    }

    function catchFish() {
      setIsOpen(true);
      toFishWeight();
      toFishTall();
    }

    function closeModal() {
      setIsOpen(false);
    }

    return (
        <div>
            <div className="layout">
                <h1>Fishing Simulator 1988</h1>
                <Link to="/"> <img className='logolayout' alt="logo poisson" src={logo} /></Link>
            </div>

            {fishing === true ? <div className='fishingYes' onClick={catchFish}></div> : <div className='fishingNo'></div> }
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <button onClick={closeModal}>Fermer</button>
              <div>Félicitation ! Vous avez attrapé un poisson de {fishPowerWeight}</div>
              <div>Il mesure {fishPowerTall}</div>
          </Modal>
            <div>
                <footer className='footerlayout'>
                <div>
                <table>
                    <caption>Choisissez votre équipement  <button onClick={refreshPage}>Réinitialiser</button>
                    {totalPower >= 3 && <button onClick={() => isFishing(true)}>Commencer à pêcher</button>}
                    </caption>
                    <th>
                        <tr>Appats</tr>
                        {baitIsChecked.map((item, index) => (
                        <tr key={item.id}>
                        {item.category === 'Appat' ? <td>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChangeBait(e)}
                            checked={item.baitChecked}
                            id={item.id}
                            className='inputlayout'
                        />{item.name}</td> : null}
                        </tr>))}
                    </th>
                    <th>
                        <tr>Cannes</tr>
                        {rodIsChecked.map((item, index) => (
                        <tr key={item.id}>
                        {item.category === 'Canne' ? <td>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChangeRod(e)}
                            checked={item.rodChecked}
                            className='inputlayout'
                        />{item.name}</td> : null}
                        </tr>))}
                    </th>
                    <th>
                        <tr>Lignes</tr>
                        {lineIsChecked.map((item, index) => (
                        <tr key={item.id}>
                        {item.category === 'Ligne' ? <td>
                        <input
                            type="Checkbox"
                            value={item.id}
                            onChange={(e) => handleChangeLine(e)}
                            checked={item.lineChecked}
                            className='inputlayout'
                        />{item.name}</td> : null}
                        </tr>))}
                    </th>
                    </table>
                    </div>

                </footer>
            </div>
        </div>
    )
}

export default Layout