import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { removeIcon, saveIcon, calculateIcon, linkArrow } from './svg';
import MakeID from './makeids';
import { newSample } from './functions';
import SoilClassification from './soilclassification';
import GraphicLog from './graphiclog';


class Samples extends Component {
    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activesampleid: false, sampleset: '', samplenumber: '', sampledepth: '', depth: '', diameter: '', samplelength: '', tareno: '', tarewgt: '', wetwgt: '', wetwgt_2: '', drywgt: '', spt: '', uscs: '', ll: '', pi: '', description: '', graphiclog: '', sptlength: '', remarks: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const projectid = this.props.projectid;

        if (!projects) {
            ues.loadProjects.call(this);
        }

        const borings = ues.getBoringsbyProjectID.call(this, projectid)
        if (!borings) {
            ues.loadBorings.call(this, projectid)


        }




    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showsampleids() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        let sampleids = [];
        if (samples) {
            // eslint-disable-next-line
            samples.map(sample => {
                sampleids.push(this.showsampleid(sample))
            })


        }
        return sampleids;

    }

    removeSampleID(sampleid) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        if (borings) {
            const boringid = this.props.boringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples.splice(j, 1)
                    this.props.reduxBorings(borings)
                    this.setState({ activesampleid: false })
                }
            }
        }
    }

    handleSampleID(sampleid) {
        if (this.state.activesampleid) {
            this.setState({ activesampleid: false })
        } else {
            this.setState({ activesampleid: sampleid })
        }
    }

    showsampleid(sample) {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this);
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)
        const projectid = this.props.projectid;
        const boringid = this.props.boringid;
        const myuser = ues.checkUser.call(this);
        const headerFont = ues.headerFont.call(this)

        if (myuser) {
            const userid = myuser.userid;
            const boring = ues.getBoringbyID.call(this, boringid)

            const highlight = (sampleid) => {
                if (this.state.activesampleid === sampleid) {
                    return (styles.activeid)
                } else {
                    return;
                }
            }
            const moist = () => {
                let wgtwater = 0;
                let netweight = Number(sample.drywgt) - Number(sample.tarewgt)

                if (Number(sample.wetwgt_2) > 0) {
                    wgtwater = Number(sample.wetwgt_2) - Number(sample.drywgt)

                } else {
                    wgtwater = Number(sample.wetwgt) - Number(sample.drywgt);

                }
                if ((wgtwater / netweight) > 0) {
                    return (wgtwater / netweight)
                } else {
                    return 0;
                }

            }
            const netwgt_1 = () => {
                if (Number(sample.wetwgt_2) > 0) {
                    let netwgt_1 = (Number(sample.wetwgt) - Number(sample.tarewgt)) / (1 + moist())
                    return netwgt_1;
                }
            }
            const netwgt = () => {
                if (Number(sample.drywgt) && Number(sample.tarewgt) > 0) {
                    return (Number(sample.drywgt) - Number(sample.tarewgt));
                } else {
                    return 0;
                }


            }
            const wgtwater_1 = () => {

                if (Number(sample.wetwgt_2) > 0) {
                    return (netwgt_1() * moist())
                } else {
                    return (Number(sample.wetwgt) - Number(sample.drywgt))
                }

            }
            const wgtwater = () => {
                if (Number(sample.wetwgt_2) > 0) {
                    if (Number(sample.wetwgt_2) > 0 && Number(sample.drywgt) > 0) {
                        return (Number(sample.wetwgt_2) - Number(sample.drywgt))
                    } else {
                        return 0;
                    }

                } else {
                    if (Number(sample.wetwgt) > 0 && Number(sample.drywgt) > 0) {
                        return (Number(sample.wetwgt) - Number(sample.drywgt))
                    } else {
                        return 0;
                    }

                }



            }
            const showwgtwater = () => {
                if (Number(sample.wetwgt_2) > 0) {
                    if (Number(wgtwater_1()) > 0 && Number(wgtwater()) > 0) {
                        return (`${Number(wgtwater_1()).toFixed(1)}g/${Number(wgtwater()).toFixed(1)}g`)
                    } else {
                        return 0;
                    }

                } else {
                    if (wgtwater() > 0) {
                        return (`${Number(wgtwater()).toFixed(1)}g`)
                    } else {
                        return 0;
                    }

                }
            }
            const shownetwgt = () => {
                if (Number(sample.wetwgt_2) > 0) {
                    return (`${Number(netwgt_1()).toFixed(1)}/${Number(netwgt()).toFixed(1)}g`)
                } else {
                    return (`${Number(netwgt()).toFixed(1)}g`);
                }
            }
            const dryden = () => {
                let netweight = 0;
                if (Number(sample.wetwgt_2) > 0) {
                    netweight = netwgt_1()
                } else {
                    netweight = netwgt();
                }
                if (netweight > 0 && sample.diameter > 0 && sample.samplelength > 0) {
                    return (netweight / (.25 * Math.pow(Number(sample.diameter), 2) * Math.PI * Number(sample.samplelength))) * (1 / 453.592) * (144 * 12)
                } else {
                    return 0;
                }
            }
            const showdryden = () => {
                return (`${Math.round(Number(dryden()))}`)
            }

            if (boring) {
                return (
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={sample.sampleid}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex5, ...regularFont, ...styles.generalFont }} onClick={() => { this.handleSampleID(sample.sampleid) }}>
                                    <span style={{ ...highlight(sample.sampleid) }} >{boring.boringnumber}-{sample.sampleset}({sample.samplenumber}) SampleDepth:{sample.sampledepth} Depth:{sample.depth}ft Diameter:{sample.diameter} in. Length {sample.samplelength} in. Description {sample.description}  SPT: {sample.spt} SPTLength:{sample.sptlength} WetWgt: {sample.wetwgt}g  Wet Wgt 2: {sample.wetwgt_2}g Dry Wgt:{sample.drywgt}g Tare Wgt {sample.tarewgt}g  WgtWater:{showwgtwater()} NetWgt:{shownetwgt()} Moist: {Number(moist() * 100).toFixed(1)}% DryDen:{showdryden()}pcf Tare No: {sample.tareno} LL: {sample.ll} PI: {sample.pi}</span>

                                </div>
                                <div style={{ ...styles.flex1 }}>
                                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeSampleID(sample.sampleid) }}>
                                        {removeIcon()}
                                    </button>
                                </div>

                            </div>

                            <div style={{ ...styles.generalFlex }}>
                                <div style={{ ...styles.flex1, ...highlight(sample.sampleid), ...styles.addLeftMargin }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }}
                                        to={`/${userid}/projects/${projectid}/borings/${boringid}/samples/${sample.sampleid}/sieve`}>
                                        Sieve Analysis
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </div>


                )

            }

        }

    }

    getSampleSet() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let sampleset = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            sampleset = sample.sampleset;
        }
        return sampleset;

    }

    handleSampleSet(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].sampleset = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const sampledepth = this.state.sampledepth;
                const depth = this.state.depth;
                const samplenumber = this.state.samplenumber;
                const diameter = this.state.diameter;
                const samplelength = this.state.samplelength;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const tareno = this.state.tareno;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, value, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getSampleNumber() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let samplenumber = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            samplenumber = sample.samplenumber;
        }
        return samplenumber;

    }

    handleSampleNumber(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].samplenumber = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const sampledepth = this.state.sampledepth;
                const depth = this.state.depth;
                const sampleset = this.state.sampleset;
                const diameter = this.state.diameter;
                const samplelength = this.state.samplelength;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const tareno = this.state.tareno;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, value, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getSampleDepth() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let sampledepth = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            sampledepth = sample.sampledepth;
        }
        return sampledepth;

    }

    handleSampleDepth(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].sampledepth = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const depth = this.state.depth;
                const sampleset = this.state.sampleset;
                const diameter = this.state.diameter;
                const samplelength = this.state.samplelength;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const tareno = this.state.tareno;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, value, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getDepth() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let depth = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            depth = sample.depth;
        }
        return depth;

    }

    handleDepth(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].depth = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const diameter = this.state.diameter;
                const samplelength = this.state.samplelength;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const tareno = this.state.tareno;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, value, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getDiameter() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let diameter = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            diameter = sample.diameter;
        }
        return diameter;

    }

    handleDiameter(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].diameter = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const samplelength = this.state.samplelength;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const tareno = this.state.tareno;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, value, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getSampleLength() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let samplelength = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            samplelength = sample.samplelength;
        }
        return samplelength;

    }

    handleSampleLength(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].samplelength = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const tareno = this.state.tareno;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, value, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getTareNo() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let tareno = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            tareno = sample.tareno;
        }
        return tareno;

    }

    handleTareNo(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)

                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].tareno = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tarewgt = this.state.tarewgt;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, value, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getTareWgt() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let tarewgt = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            tarewgt = sample.tarewgt;
        }
        return tarewgt;

    }

    handleTareWgt(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].tarewgt = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const wetwgt = this.state.wetwgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, value, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getWetWgt() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let wetwgt = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            wetwgt = sample.wetwgt;
        }
        return wetwgt;

    }

    handleWetWgt(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].wetwgt = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt_2 = this.state.wgtwgt_2;
                const drywgt = this.state.drywgt;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, value, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getWetWgt_2() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let wetwgt_2 = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            wetwgt_2 = sample.wetwgt_2;
        }
        return wetwgt_2;

    }

    handleWetWgt_2(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].wetwgt_2 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const drywgt = this.state.drywgt;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, value, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getDryWgt() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let drywgt = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            drywgt = sample.drywgt;
        }
        return drywgt;

    }

    handleDryWgt(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].drywgt = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const spt = this.state.spt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, value, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getSPT() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let spt = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            spt = sample.spt;
        }
        return spt;

    }

    handleSPT(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].spt = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const drywgt = this.state.drywgt;
                const sptlength = this.state.sptlength;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, value, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    getSPTLength() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let sptlength = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            sptlength = sample.sptlength;
        }
        return sptlength;

    }

    handleSPTLength(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].sptlength = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const uscs = this.state.uscs;
                const drywgt = this.state.drywgt;
                const spt = this.state.spt;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, value, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getUSCS() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let uscs = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            uscs = sample.uscs;
        }
        return uscs;

    }

    handleUSCS(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].uscs = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const sptlength = this.state.sptlength;
                const drywgt = this.state.drywgt;
                const spt = this.state.spt;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const ll = this.state.ll;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, value, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getLL() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let ll = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            ll = sample.ll;
        }
        return ll;

    }

    handleLL(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].ll = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const sptlength = this.state.sptlength;
                const drywgt = this.state.drywgt;
                const spt = this.state.spt;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const uscs = this.state.uscs;
                const pi = this.state.pi;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, value, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getPI() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let pi = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            pi = sample.pi;
        }
        return pi;

    }

    handlePI(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].pi = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const sptlength = this.state.sptlength;
                const drywgt = this.state.drywgt;
                const spt = this.state.spt;
                const remarks = this.state.remarks;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const uscs = this.state.uscs;
                const ll = this.state.ll;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, value, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getRemarks() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let remarks = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            remarks = sample.remarks;
        }
        return remarks;

    }

    handleRemarks(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].remarks = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const description = this.state.description;
                const sptlength = this.state.sptlength;
                const drywgt = this.state.drywgt;
                const spt = this.state.spt;
                const pi = this.state.pi;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const uscs = this.state.uscs;
                const ll = this.state.ll;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, value)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }


    getDescription() {
        const ues = new UES();
        const boringid = this.props.boringid;
        let description = "";
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            description = sample.description;
        }
        return description;

    }

    handleDescription(value) {
        const ues = new UES();
        const makeid = new MakeID()
        let borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        const boring = ues.getBoringbyID.call(this, boringid)

        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)

            if (this.state.activesampleid) {
                const sampleid = this.state.activesampleid;
                const sample = ues.getSampleByID.call(this, boringid, sampleid)
                if (sample) {
                    const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                    borings[i].samples[j].description = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
                }


            } else {
                const sampleid = makeid.sampleID.call(this);
                const samplenumber = this.state.samplenumber;
                const sampledepth = this.state.sampledepth;
                const sampleset = this.state.sampleset;
                const depth = this.state.depth;
                const diameter = this.state.diameter;
                const remarks = this.state.remarks;
                const sptlength = this.state.sptlength;
                const drywgt = this.state.drywgt;
                const spt = this.state.spt;
                const pi = this.state.pi;
                const tarewgt = this.state.tarewgt;
                const wetwgt = this.state.wgtwgt;
                const wetwgt_2 = this.state.wetwgt_2;
                const tareno = this.state.tareno;
                const samplelength = this.state.samplelength;
                const graphiclog = this.state.graphiclog;
                const uscs = this.state.uscs;
                const ll = this.state.ll;
                const newsample = newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, value, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks)
                if (samples) {
                    borings[i].samples.push(newsample)

                } else {
                    borings[i].samples = [newsample]
                }
                this.setState({ activesampleid: sampleid })
            }


        }


    }

    showCalcUSCS() {
        const ues = new UES();
        const styles = MyStylesheet();
        const boringid = this.props.boringid;
        const buttonWidth = ues.generateIcon.call(this)
        if (this.state.activesampleid) {
            const sampleid = this.state.activesampleid;

            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample.ll && sample.pi && sample.hasOwnProperty("sieve")) {

                return (<div style={{ ...styles.generalContainer }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.calcUSCS() }}>{calculateIcon()}</button>
                </div>)
            }

        }


    }

    calcUSCS() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const sampleid = this.state.activesampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid);
            let uscs = ''
            if (sample) {
                const ll = Number(sample.ll);
                const pi = Number(sample.pi);
                if (!ll || !pi) {
                    alert(`No LL or PI found`)
                } else {

                    if (!sample.hasOwnProperty("sieve")) {

                        alert(`No Sieve Found`)

                    } else {

                        const sieve = sample.sieve;
                        const netwgt = Number(sample.drywgt) - Number(sample.tarewgt)
                        const ll = Number(sample.ll);
                        const pi = Number(sample.pi)
                        const wgt34 = Number(sieve.wgt34)
                        const wgt38 = Number(sieve.wgt38)
                        const wgt4 = Number(sieve.wgt4)
                        const wgt10 = Number(sieve.wgt10)
                        const wgt30 = Number(sieve.wgt30)
                        const wgt40 = Number(sieve.wgt40)
                        const wgt100 = Number(sieve.wgt100)
                        const wgt200 = Number(sieve.wgt200)

                        const getSoilClassification = new SoilClassification(netwgt, ll, pi, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200)
                        const classification = getSoilClassification.getClassification();
                        uscs = classification.uscs;
                        let description = sample.description;
                        description += ` ${classification.description}`

                        this.handleUSCS(uscs)
                        this.handleDescription(description)


                    }



                }

            } else {
                alert(`Sample Not Found`)
            }

        }

    }







    render() {
        const ues = new UES();

        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const myuser = ues.checkUser.call(this)
        const headerFont = ues.headerFont.call(this)
        const buttonWidth = ues.generateIcon.call(this)
        const graphiclog = new GraphicLog();
        const arrowWidth = ues.arrowWidth.call(this)
        if (myuser) {
            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const boringid = this.props.boringid;
                const boring = ues.getBoringbyID.call(this, boringid)

                if (boring) {

                    return (

                        <div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>


                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                                    /{project.projectnumber} {project.title} </Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings`}>
                                    /borings</Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings/${boringid}/samples`}>
                                    /boring number {boring.boringnumber} samples</Link>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getSampleSet()}
                                        onChange={(event) => { this.handleSampleSet(event.target.value) }} />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Sample Set</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getSampleNumber()}
                                        onChange={event => { this.handleSampleNumber(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Sample Number</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getSampleDepth()}
                                        onChange={event => { this.handleSampleDepth(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Sample Depth</span>

                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getDepth()}
                                        onChange={event => { this.handleDepth(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Depth</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getDiameter()}
                                        onChange={event => { this.handleDiameter(event.target.value) }} />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Sample Diameter</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getSampleLength()}
                                        onChange={event => { this.handleSampleLength(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>SampleLength</span>
                                </div>
                            </div>



                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getTareNo()}
                                        onChange={event => { this.handleTareNo(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Tare No</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getTareWgt()}
                                        onChange={event => { this.handleTareWgt(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Tare Wgt</span>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getWetWgt()}
                                        onChange={event => { this.handleWetWgt(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Wet Wgt</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getWetWgt_2()}
                                        onChange={event => { this.handleWetWgt_2(event.target.value) }} />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Wet Wgt_2</span>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getDryWgt()}
                                        onChange={event => { this.handleDryWgt(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>Dry Wgt</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getSPT()}
                                        onChange={event => { this.handleSPT(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>SPT</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getSPTLength()}
                                        onChange={event => { this.handleSPTLength(event.target.value) }} />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>SPT Length</span>
                                </div>
                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getLL()}
                                        onChange={event => { this.handleLL(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>LL</span>

                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getPI()}
                                        onChange={event => { this.handlePI(event.target.value) }}
                                    />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>PI</span>
                                </div>
                                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                    {this.showCalcUSCS()}
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getUSCS()}
                                        onChange={event => { this.handleUSCS(event.target.value) }} />
                                    <span style={{ ...styles.generalFont, ...regularFont }}>USCS</span>

                                </div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.getRemarks()}
                                    onChange={event => { this.handleRemarks(event.target.value) }} />
                                <span style={{ ...styles.generalFont, ...regularFont }}>Remarks</span>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                    value={this.getDescription()}
                                    onChange={event => { this.handleDescription(event.target.value) }}
                                />
                                <span style={{ ...styles.generalFont, ...regularFont }}>Description</span>
                            </div>
                          
                                {graphiclog.showGraphicLog.call(this)}
                            

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { ues.saveBorings.call(this) }}>{saveIcon()}</button>
                            </div>
                            {this.showsampleids()}
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings/${boring.boringid}/logdraft`}><button style={{ ...styles.generalButton, ...arrowWidth }}>{linkArrow()}</button> View LogDraft </Link>
                            </div>
                        </div>




                    )

                } else {

                    return (<div style={{ ...styles.generalContainer }}>

                        <span style={{ ...styles.generalFont, ...regularFont }}>Boring Not Found </span>
                    </div>)

                }

            } else {

                return (<div style={{ ...styles.generalContainer }}>

                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
                </div>)


            }

        } else {
            return (<div style={{ ...styles.generalContainer }}>

                <span style={{ ...styles.generalFont, ...regularFont }}>No User Found</span>
            </div>)
        }

    }

}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        projects: state.projects,
        borings: state.borings
    }
}

export default connect(mapStateToProps, actions)(Samples);