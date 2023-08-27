import React from 'react';
import WinnerSelectSlider from "./components/WinnerSelectSlider/WinnerSelectSlider";
import './App.css';
import {MstProvider, rootStore} from "./models/Root";
import BetManager from "./components/BetManager/BetManager";
import TotalDisplay from "./components/TotalDisplay/TotalDisplay";

const App = () => {

    return (
        <MstProvider value={rootStore}>
            <div className='game-field'>
                <BetManager />

                <div className='main'>
                    <TotalDisplay />

                    <WinnerSelectSlider />
                </div>
            </div>
        </MstProvider>
    );
};

export default App;
