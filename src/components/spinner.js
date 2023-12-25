
import React, { Component } from 'react'
import { MyStylesheet } from './styles';
class Spinner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeposition: 0
        }


    }

    componentDidMount() {

        this.getSpinner = window.setInterval(() => {

            let currentposition = this.state.activeposition;
            const activeposition = this.spinnerPosition(currentposition);

            this.setState({ activeposition })



        }, 333)





    }

    componentWillUnmount() {

        window.clearInterval(this.getSpinner);

    }


    spinnerPosition(num) {

        switch (num) {

            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 0;
            default:
                return 0;



        }



    }





    render() {
        const activeposition = this.state.activeposition;
        const styles = MyStylesheet();
        const rect_1 = (activeposition) => {
            if (activeposition === 0) {
                return (<rect className="spinner-2" x=".5" y=".5" width="31" height="31" />)

            } else {
                return (<rect className="spinner-1" x=".5" y=".5" width="31" height="31" />)
            }


        }

        const rect_2 = (activeposition) => {

            if (activeposition === 1) {

                return (<rect className="spinner-2" x="50.5" y=".5" width="31" height="31" />)

            } else {
                return (<rect className="spinner-1" x="50.5" y=".5" width="31" height="31" />)
            }


        }

        const rect_3 = (activeposition) => {

            if (activeposition === 2) {

                return (<rect className="spinner-2" x="100.5" y=".5" width="31" height="31" />)

            } else {

                return (<rect className="spinner-1" x="100.5" y=".5" width="31" height="31" />)

            }


        }

        return (

            <div style={{ ...styles.generalContainer }}>
                
                <div style={{ ...styles.generalContainer, ...styles.miniWidth, ...styles.centerDiv }}>

                    <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 32"><defs><style>
                    </style></defs><g id="Layout">
                            {rect_1(activeposition)}
                            {rect_2(activeposition)}
                            {rect_3(activeposition)}
                        </g>
                    </svg>
                </div>
            </div>
        )


    }

}

export default Spinner;