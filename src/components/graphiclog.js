import React from 'react';
import { MyStylesheet } from './styles'
import UES from './ues';
import { uploadIcon } from './svg';
import { UploadGraphicLog } from './actions/api'

class GraphicLog {

    async uploadnewimage() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this,boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid,sampleid)
                let formData = new FormData();
                let myfile = document.getElementById("graphic-log");
                formData.append("graphiclog", myfile.files[0]);
                formData.append("sample", JSON.stringify(sample))
                let response = await UploadGraphicLog(formData);
                if (response.hasOwnProperty("sample")) {
                    const sample = response.sample;
                    const sampleid = sample.sampleid;
                    const j = ues.getSampleKeyByID.call(this, boringid,sampleid)
                    myuser.borings[i].samples[j] = sample;
                    this.props.reduxUser(myuser)
                    this.setState({ render: 'render' })

                }
            }

        }
    }
    

    getAllSampleImages() {

        const ues = new UES();


        let sampleimages = [];
        let projectnumber = "";
        let sampleid = "";
        let description = "";
        let graphiclog = "";

        const newSample = (sampleid, projectnumber, description, graphiclog) => {
            return ({ sampleid, projectnumber, description, graphiclog })
        }

        const borings = ues.getBorings.call(this)
        if(borings) {
            // eslint-disable-next-line
            borings.map(boring=> {
                const projectid = boring.projectid;
                const project = ues.getProjectbyID.call(this,projectid)
                if(project) {
                    projectnumber = project.projectnumber;

                }

                if(boring.hasOwnProperty("samples")) {
                    // eslint-disable-next-line
                    boring.samples.map(sample=> {
                        if(sample.graphiclog) {
                            sampleid = sample.sampleid;
                            description = sample.description;
                            graphiclog = sample.graphiclog;
                            sampleimages.push(newSample(sampleid,projectnumber,description,graphiclog))
                        }
                    })
                }
            })
        }

        
        return sampleimages;
    }
 
    getImages() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this);
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this);
        const graphiclog = new GraphicLog();
    
        let myimages = [];

        const imageWidth = ues.logdraftImage.call(this)
       
        const showimage = (image) => {
    
    
            return (
                <div style={{ ...styles.generalFlex }} onClick={() => { graphiclog.handleGraphicLog.call(this, image.graphiclog) }} key={`image-${image.sampleid}`}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.alignRight }}>
                            <img src={image.graphiclog} alt={image.description} style={{...imageWidth}} />
                        </div>
                    </div>
                    <div style={{ ...styles.flex3 }}>
                        <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                            {image.graphiclog}
                        </div>
                        <div style={{ ...styles.generalContainer, ...regularFont, ...styles.generalFont }}>
                            Project Number {image.projectnumber} {image.description}
                        </div>
                    </div>
                </div>)
    
    
    
        }
    
    
        const validatenewimage = (images, newImage) => {
            let validate = true;
            if (images.length > 0) {
                // eslint-disable-next-line
                images.map(image => {
                    if (newImage.graphiclog === image.graphiclog) {
                        validate = false;
                    }
                })
    
            }
            return validate;
    
        }
        if (myuser) {
            let images = [];
            const samples = graphiclog.getAllSampleImages.call(this)
            if (samples) {
                // eslint-disable-next-line
                samples.map(sample => {
    
    
    
                    let validate = validatenewimage(images, sample)
                    if (validate) {
                        images.push(sample)
                    }
    
    
    
    
                })
            }
            if (images.length > 0) {
                // eslint-disable-next-line
                images.map(image => {
                    myimages.push(showimage(image))
                })
            }
    
        }
        return myimages;
    }
    getGraphicLog() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let graphiclog = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            graphiclog = sample.graphiclog;
        }
        return graphiclog;

    }

    handleGraphicLog(value) {
        const ues = new UES();
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].graphiclog = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } 


        }


    }

    showGraphicLog() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const graphiclog = new GraphicLog();
        const buttonWidth = ues.generateIcon.call(this)

        if(this.state.activesampleid) {


        return (<div style={{ ...styles.generalContainer }}>

            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>


                <div style={{ ...styles.generalContaine }}>

                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={graphiclog.getGraphicLog.call(this)}
                        onChange={event => { graphiclog.handleGraphicLog.call(this, event.target.value) }}
                    />

                </div>
                <span style={{ ...styles.generalFont, ...regularFont }}>Graphic Log</span>

            </div>

            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <input type="file" id="graphic-log" /><button style={{ ...styles.generalButton, ...buttonWidth, ...styles.leftMargin40 }}>{uploadIcon()}</button>
            </div>

            {graphiclog.getImages.call(this)}


        </div>)

        }
    }

}

export default GraphicLog;