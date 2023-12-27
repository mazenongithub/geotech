import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import { Link } from 'react-router-dom';
import UES from './ues';
import { milestoneformatdatestring, calcdryden, moist,convertDegree } from './functions'
import '../logdraft.css';


class LogDraft extends Component {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0 }
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

    showsamplenumber(samplenos, depth) {
        const styles = MyStylesheet();
        // <text className="logdraft-12" transform="translate(933.48 492.87)"><tspan x="0" y="0">2-1(1)5</tspan><tspan className="logdraft-20" x="51.58" y="0">’</tspan></text>
        console.log(samplenos, depth)
        return (
            <foreignObject x="918.58" y={`${Math.ceil(224 + (50 * depth))}`} width="77" height="700">
                <div style={{ ...styles.alignCenter, ...styles.generalContainer }}>
                    <text className="logdraft-12"><tspan x="0" y="0">{samplenos}</tspan></text>
                </div>
            </foreignObject>
        )

    }


    getBoring() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        return boring

    }

    loadsamplenumbers() {
        let samplenos = [];
        const samples = this.getSamples();
        const boring = this.getBoring();
        if (boring) {
            if (samples.length > 0) {
                // eslint-disable-next-line
                samples.map(sample => {
                    let sampleset = Number(sample.sampleset);
                    if (sampleset > 0) {
                        sampleset = `${boring.boringnumber}-${sample.sampleset}`

                        samplenos.push(this.showsamplenumber(sampleset, sample.depth))
                    }
                })
            }
        }
        return samplenos;

    }

    showdescription(description, depth) {


        return (
            <foreignObject x="194.5" y={`${Math.ceil(224 + (50 * depth))}`} width="698" height="700">
                <div>
                    <text className='logdraft-12 regularFont'><tspan x="0" y="0">{description}</tspan></text>
                </div>
            </foreignObject>
        )

    }

    getSamples() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        return samples;
    }

    loaddescription() {
        const samples = this.getSamples();
        let descriptions = [];
        if (samples) {
            // eslint-disable-next-line
            samples.map(sample => {
                descriptions.push(this.showdescription(sample.description, sample.depth))
            })

        }
        return descriptions;

    }

    showspt(spt, depth) {
        const styles = MyStylesheet();
        if (spt) {


            return (
                <foreignObject x="996.02" y={`${Math.ceil(224 + (50 * depth))}`} width="54" height="700">
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>

                        <text className="logdraft-12"><tspan x="0" y="0">{spt}</tspan></text>
                    </div>
                </foreignObject>)
        }
    }


    loadspt() {

        const samples = this.getSamples();
        let spt = [];
        if (samples) {
            // eslint-disable-next-line
            samples.map(sample => {
                if (sample.spt) {
                    console.log(sample.spt)
                    spt.push(this.showspt(sample.spt, sample.depth))
                }
            })
        }
        return spt;

    }

    loadmoisturecontent() {
        const samples = this.getSamples();
        let moisturecontent = ""
        let moisture = [];

        if (samples) {
            // eslint-disable-next-line
            samples.map(sample => {
                moisturecontent = Number(moist(sample.drywgt, sample.tarewgt, sample.wetwgt, sample.wetwgt_2) * 100).toFixed(1)
                moisture.push(this.showmoisturecontent(moisturecontent, sample.depth))

            })
        }
        return moisture;


    }

    showmoisturecontent(moisturecontent, depth) {
        const styles = MyStylesheet();
        if (Number(moisturecontent > 0)) {
            return (

                <foreignObject x="1051.02" y={`${Math.ceil(224 + (50 * depth))}`} width="55" height="700">
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <text className="logdraft-12"><tspan x="0" y="0">{moisturecontent}</tspan></text>
                    </div>
                </foreignObject>)
        }

    }

    showdryden(dryden, depth) {
        const styles = MyStylesheet();
        if (Number(dryden > 0)) {

            return (
                <foreignObject x="1107.35" y={`${Math.ceil(224 + (50 * depth))}`} width="54" height="700">
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <text className="logdraft-12"><tspan x="0" y="0">{dryden}</tspan></text>
                    </div>
                </foreignObject>)
        }
    }
    loaddryden() {
        const samples = this.getSamples();
        let drydens = [];

        if (samples) {
            // eslint-disable-next-line
            samples.map(sample => {
                let dryden = calcdryden(sample.wetwgt_2, sample.wetwgt, sample.tarewgt, sample.drywgt, sample.diameter, sample.samplelength)
                drydens.push(this.showdryden(dryden, sample.depth))
            })
        }
        return drydens;

    }


    showremarks(remarks, depth) {
        console.log(remarks, depth)
        const styles = MyStylesheet();
        if (remarks) {
            return (<foreignObject x="1162.5" y={`${Math.ceil(224 + (50 * depth))}`} width="102" height="600">
                <div style={{ ...styles.generalContainer }}>
                    <text className="logdraft-12"><tspan x="0" y="0">{remarks}</tspan></text>
                </div></foreignObject>)
        }

    }


    loadremarks() {
        const samples = this.getSamples();
        console.log(samples)
        let remarks = [];
        if (samples.length > 0) {
            // eslint-disable-next-line
            samples.map(sample => {

                remarks.push(this.showremarks(sample.remarks, sample.depth))
            })
        }

        return remarks;

    }

    calcBottomofBoring() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const borings = ues.getBorings.call(this)
        const boring = ues.getBoringbyID.call(this, boringid)
        let bottom = 0;
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            if (boring.hasOwnProperty("samples")) {
                const j = boring.samples.length - 1;
                bottom = Number(borings[i].samples[j].depth).toFixed(1);

            }

        }

        return bottom;
    }

    showBoringBottom() {

        const depth = this.calcBottomofBoring()
        const y1 = Math.ceil(240 + (50 * depth))
        const boring = this.getBoring();
        let groundwater = ' Groundwater was not encountered '
        if (boring) {
            if (Number(boring.gwdepth) > 0) {
                const gwdepth = Number(boring.gwdepth).toFixed(1)
                groundwater = ` Groundwater was was encounted at ${gwdepth} feet. `

            }





            return (

                <g transform={`translate(60.5 ${y1})`}>
                    <line className="logdraft-5" x1={0} y1={0} x2={1206.5} y2={0} />
                    <text className="logdraft-12"><tspan x="135" y="20">Bottom of Boring at {depth} feet below ground surface. {groundwater}</tspan></text>
                </g>


            )

        }


    }

    showSampleLines() {
        const depth = this.calcBottomofBoring();
        const y2 = Math.ceil(240 + (50 * depth))
        return (<g>
            <line className="logdraft-7" x1="889.5" y1="237.41" x2="890" y2={y2} />
            <line className="logdraft-7" x1="919.5" y1="237.41" x2="919" y2={y2} />
            <line className="logdraft-7" x1="996.5" y1="237.41" x2="996.5" y2={y2} />
            <line className="logdraft-7" x1="1051.5" y1="237.41" x2="1051.5" y2={y2} />
            <line className="logdraft-7" x1="1106.5" y1="237.41" x2="1106.5" y2={y2} />
            <line className="logdraft-7" x1="1161.5" y1="237.41" x2="1161.5" y2={y2} />
            <line className="logdraft-7" x1="191" y1="237.41" x2="191" y2={y2} />
        </g>)
    }


    showGroundWaterSym() {
        const boring = this.getBoring();
        if (boring) {
            const gwdepth = boring.gwdepth;
            if (Number(gwdepth) > 0) {
                const y1 = 50 * gwdepth;
                return (<g transform={`translate(0 ${y1})`}>
                    <polygon class="logdraft-16" points="871.25 236.23 884 222.41 858.5 222.41 871.25 236.23" />
                    <line class="logdraft-4" x1="854.75" y1="236.41" x2="887.75" y2="236.41" />
                    <line class="logdraft-4" x1="864.25" y1="238.91" x2="878.25" y2="238.91" />
                </g>)

            }


        }
    }

    loadSampleTypes() {
        const samples = this.getSamples();
        let samplestypes = [];
        if (samples) {
            // eslint-disable-next-line
            samples.map(sample => {
                let sptlength = Number(sample.sptlength);
                if (sptlength > 0) {
                    const depth = sample.depth;
                    sptlength = sptlength / 12;

                    samplestypes.push(this.showSampleType(sptlength, depth))

                }
            })
        }
        return samplestypes;
    }

    showSampleType(sptlength, depth) {
        const height = sptlength * 50;
        return (
            <g id="Layout" transform={`translate(889 ${238 + 50 * depth})`}>
                <rect className="liner-1" x="1" y="1" width="30" height={height} />
                <line className="liner-1" x1="5" y1="1" x2="5" y2={height + 3} />
                <line className="liner-1" x1="9.4" y1="1" x2="9.4" y2={height + 3} />
                <line className="liner-1" x1="13.8" y1="1" x2="13.8" y2={height + 3} />
                <line className="liner-1" x1="18.2" y1="1" x2="18.2" y2={height + 3} />
                <line className="liner-1" x1="22.6" y1="1" x2="22.6" y2={height + 3} />
                <line className="liner-1" x1="27" y1="1" x2="27" y2={height + 3} />
            </g>)
    }


    loadgraphics() {
        const makeGraphic = (url, depth) => {
            return ({ url, depth })
        }
        let graphics = [];
        let graphicArray = []
        const samples = this.getSamples();
        if (samples.length > 0) {
            // eslint-disable-next-line
            samples.map(sample => {
                if (sample.graphiclog) {
                    graphicArray.push(makeGraphic(sample.graphiclog, sample.depth))
                }
            })

            if (graphicArray.length > 0) {
                // eslint-disable-next-line
                graphicArray.map((graphic, i) => {
                    if (i === 0) {

                        graphics.push(this.showgraphic(0, graphic.depth, graphic.url))

                    } else {

                        graphics.push(this.showgraphic(graphicArray[i - 1].depth, graphic.depth, graphic.url))

                    }
                })
            }




            return graphics;
        }





        return graphics;

    }

    showgraphic(y1, y2, url) {
        let graphic = url;

        let style = {
            backgroundImage: `url(${graphic}`,
            width: "100%",
            height: "100%"
        }


        return (
            <g transform="translate(61 238.91)">
                <foreignObject width="129" height={(y2 - y1) * 50} x="0" y={y1 * 50}>
                    <div style={style}>
                        &nbsp;
                    </div>
                </foreignObject>
            </g>)

    }



    showTitleBlock() {
        const styles = MyStylesheet();
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid);



        if (project) {
            const boring = this.getBoring();
            if (boring) {
                const boringbotton = this.calcBottomofBoring()
                return (
                    <div style={{ ...styles.generalContainer }}>


                        <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1267.25 444.5">
                            <g id="Layout">
                                <text className="logdraftblock-4" transform="translate(6.25 418.79)"><tspan x="0" y="0">Remarks</tspan></text>
                                <text className="logdraftblock-4" transform="translate(132.25 418.79)"><tspan x="0" y="0">{boring.remarks}</tspan></text>
                                <text className="logdraftblock-4" transform="translate(9.25 343.57)"><tspan x="0" y="0">Groundwater Depth </tspan><tspan x="0" y="24">[Elevation], feet</tspan></text>
                                <text className="logdraftblock-4" transform="translate(9.25 283.57)"><tspan x="0" y="0">Drill Rig </tspan><tspan className="logdraftblock-6" x="0" y="24">T</tspan><tspan x="11.11" y="24">ype</tspan></text>
                                <text className="logdraftblock-4" transform="translate(107.25 289.57)"><tspan x="0" y="0">{boring.drillrig}</tspan></text>
                                <text className="logdraftblock-4" transform="translate(9.25 216.57)"><tspan x="0" y="0">Drilling </tspan><tspan x="0" y="24">Method</tspan></text>
                                <text className="logdraftblock-4" transform="translate(107.25 222.57)"><tspan x="0" y="0">{boring.drillmethod} </tspan></text>
                                <text className="logdraftblock-4" transform="translate(9.25 153.57)"><tspan x="0" y="0">Date </tspan><tspan x="0" y="24">Drilled</tspan></text><text className="logdraftblock-2" transform="translate(16.25 30.43)"><tspan x="0" y="0" >Project:     </tspan></text>
                                <text className="logdraftblock-2" transform="translate(854.63 34.43)"><tspan x="0" y="0">LOG OF SOI</tspan><tspan className="logdraftblock-3" x="140" y="0">L</tspan><tspan x="154.23" y="0" > BORING B{boring.boringnumber}    </tspan></text>
                                <text className="logdraftblock-2" transform="translate(121.25 29.43)"><tspan x="0" y="0">{project.title} </tspan></text>
                                <text className="logdraftblock-2" transform="translate(16.25 69.43)"><tspan x="0" y="0" >Project Location:   </tspan></text>

                                <g transform="translate(228.25 39.43)">
                                    <foreignObject width="490" height="300">
                                        <text className="logdraftblock-2"><tspan x="0" y="0" >{project.address}, {project.city}, {project.projectstate} </tspan></text>
                                    </foreignObject>
                                </g>

                                <text className="logdraftblock-2" transform="translate(16.25 109.43)"><tspan x="0" y="0" >Project Number:   </tspan></text><text className="logdraftblock-2" transform="translate(228.25 109.43)"><tspan x="0" y="0" >{project.projectnumber}   </tspan></text>

                                <text className="logdraftblock-4" transform="translate(107.25 159.57)"><tspan x="0" y="0">{milestoneformatdatestring(boring.datedrilled)}</tspan></text>
                                <text className="logdraftblock-4" transform="translate(208.25 351.79)"><tspan x="0" y="0">{boring.gwdpeth}</tspan></text><text className="logdraftblock-4" transform="translate(520.25 414.98)"><tspan x="0" y="0">{convertDegree(boring.latitude)} N</tspan></text>
                                <text className="logdraftblock-4" transform="translate(659.25 414.98)"><tspan x="0" y="0">{convertDegree(boring.longitude)} W</tspan></text><text className="logdraftblock-4" transform="translate(525.25 344.57)"><tspan x="0" y="0">  {boring.samplingmethod}</tspan></text>
                                <text className="logdraftblock-4" transform="translate(428.25 410.98)"><tspan x="0" y="0">Approx. </tspan><tspan x="0" y="24">Location</tspan></text><text className="logdraftblock-4" transform="translate(428.25 343.57)"><tspan x="0" y="0">Sampling </tspan><tspan x="0" y="24">Methods</tspan></text>
                                <text className="logdraftblock-4" transform="translate(592.25 290.57)"><tspan x="0" y="0">{Number(boring.diameter)}</tspan></text><text className="logdraftblock-4" transform="translate(428.25 282.57)"><tspan x="0" y="0">Diameter of </tspan><tspan x="0" y="24">Hole, inches</tspan></text>
                                <text className="logdraftblock-4" transform="translate(548.25 226.57)"><tspan x="0" y="0">{boring.contractor}</tspan></text><text className="logdraftblock-4" transform="translate(428.25 220.57)"><tspan x="0" y="0">Drilling </tspan><tspan x="0" y="24">Contractor</tspan></text><text className="logdraftblock-4" transform="translate(548.25 164.57)"><tspan x="0" y="0">{boring.loggedby}</tspan></text><text className="logdraftblock-4" transform="translate(427.25 164.57)"><tspan x="0" y="0">Logged By</tspan></text><text className="logdraftblock-4" transform="translate(857.25 403.98)"><tspan x="0" y="0">Driving Method </tspan><tspan x="0" y="24">and Drop</tspan></text><text className="logdraftblock-4" transform="translate(857.25 340.98)"><tspan x="0" y="0">Drill Hole </tspan><tspan x="0" y="24">Backfill</tspan></text>

                                <g  transform="translate(1015.25 390.98)">
                                    <foreignObject width="230" height="300">
                                        <text className="logdraftblock-4"><tspan x="0" y="0">{boring.drivingmethod}</tspan></text>
                                    </foreignObject>
                                </g>

                                <text className="logdraftblock-4" transform="translate(961.25 347.98)"><tspan x="0" y="0">{boring.backfill}</tspan></text>
                                <text className="logdraftblock-4" transform="translate(857.25 279.98)"><tspan x="0" y="0">Approx. Surface </tspan><tspan x="0" y="24">Elevation, ft WSG 84</tspan></text><text className="logdraftblock-4" transform="translate(1065.25 291.98)"><tspan x="0" y="0">{boring.elevation}</tspan></text><text className="logdraftblock-4" transform="translate(857.25 216.98)"><tspan className="logdraftblock-1" x="0" y="0">T</tspan><tspan x="10" y="0">otal Depth </tspan><tspan x="0" y="24">of Drill Hole</tspan></text>
                                <text className="logdraftblock-4" transform="translate(996.25 227.98)"><tspan x="0" y="0">{boringbotton}</tspan></text><text className="logdraftblock-4" transform="translate(856.25 165.57)"><tspan x="0" y="0">Checked By</tspan></text><text className="logdraftblock-4" transform="translate(995.25 165.98)"><tspan x="0" y="0">{boring.checkedby}</tspan></text><rect className="logdraftblock-7" x=".25" y="131.25" width="421.67" height="62.6" /><rect className="logdraftblock-7" x=".25" y=".25" width="732" height="130.17" /><rect className="logdraftblock-7" x="733.25" y=".25" width="532" height="131" /><rect className="logdraftblock-7" x="421.92" y="131.25" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="843.58" y="131.25" width="421.67" height="62.6" /><rect className="logdraftblock-7" x=".25" y="193.85" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="421.92" y="193.85" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="843.58" y="193.85" width="421.67" height="62.6" /><rect className="logdraftblock-7" x=".25" y="256.45" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="421.92" y="256.45" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="843.58" y="256.45" width="421.67" height="62.6" /><rect className="logdraftblock-7" x=".25" y="319.05" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="421.92" y="319.05" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="843.58" y="319.05" width="421.67" height="62.6" /><rect className="logdraftblock-7" x=".25" y="381.65" width="421.67" height="62.6" /><rect className="logdraftblock-7" x="421.92" y="381.65" width="421.67" height="62.6" />
                                <rect className="logdraftblock-7" x="843.58" y="381.65" width="421.67" height="62.6" /></g></svg>

                    </div>
                )

            }

        }
    }


    drawFooter() {
        const bottomdepth = this.calcBottomofBoring();
        let y1 = 288;
        if (bottomdepth > 16) {
            y1 = y1 + (50 * bottomdepth)

        } else {
            y1 = y1 + (50 * 16)
        }
        const boring = this.getBoring();
        if(boring) {
        return (
            <g>
                <rect className="logdraft-5" x="1" y="1" width="1266" height={y1} />

                <g id="Layout" transform={`translate(0 ${y1} )`}><text className="logdraft-footer-5" transform="translate(1093.67 70.98)"><tspan x="0" y="0">FIGURE {boring.figure}</tspan></text>
                    <polyline className="logdraft-footer-3" points="0 24.63 8.13 26.04 20.04 27.85 33.92 29.05 27.77 43.72 19.64 58.79 2.18 81.29 0 73.65" />
                    <polygon className="logdraft-footer-3" points="63.88 27.25 80.34 24.63 80.34 42.51 80.34 67.43 80.34 75.31 77.46 83.6 72.11 93.54 64.52 102.58 51.87 111.62 50.24 96.86 51.28 72.15 55.74 50.45 63.88 27.25" />
                    <polygon className="logdraft-footer-4" points="16.96 103.19 12.6 99.57 7.09 92.64 14.53 82.69 22.86 68.13 30.6 52.96 36.85 36.89 39.67 28.75 45.63 28.75 35.21 57.68 28.37 74.86 16.96 103.19" />
                    <polygon className="logdraft-footer-4" points="51.73 28.75 57.38 28 53.06 40.51 50.24 49.85 45.63 64.16 42.5 77.72 40.72 89.47 39.67 103.19 38.93 117.5 24.5 109.51 30.45 91.28 38.04 68.13 45.63 46.38 51.73 28.75" />
                    <polygon className="logdraft-footer-3" points="225.15 42.92 185.08 42.92 179.68 43.67 174.17 46.53 171.19 50.75 170 56.03 170 87.21 170.9 91.43 174.62 96.86 182.35 100.02 225.15 100.02 225.15 87.52 186.52 87.21 183.99 85.71 183.39 76.97 225.15 76.52 225.15 64.91 183.69 65.52 183.69 57.98 185.03 55.87 189.05 55.42 225.15 54.97 225.15 42.92" />
                    <polygon className="logdraft-footer-3" points="274.74 59.94 288.58 59.94 288.58 54.52 287.09 49.7 284.86 46.98 280.55 44.12 276.38 42.92 245.14 42.92 239.34 44.27 235.47 47.59 233.09 52.56 232.49 59.94 232.49 65.52 233.83 69.44 236.51 73.35 242.61 76.37 271.17 76.37 273.41 77.87 274.15 80.43 274.15 84.35 273.11 86.76 249.01 86.76 246.92 85.71 246.18 83.15 232.49 83.6 232.49 86.76 233.38 90.68 235.47 95.2 240.67 98.52 244.54 100.02 276.38 100.02 282.03 97.91 287.09 92.94 288.58 87.82 288.58 77.87 286.5 72.75 283.52 69.13 278.46 66.42 272.96 65.82 249.6 65.97 246.92 64.46 246.03 59.64 247.22 56.93 248.41 55.27 270.58 55.27 272.51 55.72 274.3 57.53 274.74 59.94" />
                    <polygon className="logdraft-footer-3" points="106.03 42.92 119.57 42.92 119.57 83.9 121.06 86.46 124.03 87.82 143.82 87.82 146.65 86.16 148.13 84.95 148.13 42.92 161.97 42.92 161.97 64.46 161.97 84.35 161.08 90.83 158.85 94.6 155.57 97.31 150.07 100.02 146.94 100.02 118.82 100.02 111.83 97.61 106.77 91.43 106.03 86.16 106.03 42.92" />
                    <line className="logdraft-footer-1" x1="295.92" y1="86.47" x2="302.1" y2="86.47" /><line className="logdraft-footer-1" x1="299.01" y1="94.01" x2="299.01" y2="86.47" />
                    <line className="logdraft-footer-1" x1="303.51" y1="94.27" x2="303.51" y2="86.47" /><line className="logdraft-footer-1" x1="307.19" y1="93.67" x2="304.55" y2="86.47" />
                    <line className="logdraft-footer-1" x1="310.24" y1="86.47" x2="307.19" y2="93.67" /><line className="logdraft-footer-1" x1="311.02" y1="94.01" x2="310.84" y2="86.47" />
                    <line className="logdraft-footer-1" x1="303.51" y1="86.47" x2="304.55" y2="86.47" /><line className="logdraft-footer-1" x1="310.24" y1="86.47" x2="310.84" y2="86.47" />
                    <line className="logdraft-footer-2" x1="315.52" y1="99" x2="1263.52" y2="99" />
                    <line className="logdraft-footer-2" x1="1263.52" y1="99" x2="1263.52" />
                </g>
            </g>)

        }
    }

    drawLabels() {
        let bottom = this.calcBottomofBoring();
        let getlabels = [];

        const showlabel = (depth) => {
            let y1 = 225 + 50 * (depth)
            return (<g transform={`translate(20 ${y1})`}>
                <text className="logdraft-10"><tspan x="0" y="0">{depth}</tspan></text>
            </g>)
        }
        if (bottom <= 16) {
            bottom = 16;
        }
        let labels = Math.ceil(bottom / 5)
        let depth = 0;

        for (let i = 0; i < labels - 1; i++) {
            depth = depth + 5;
            getlabels.push(showlabel(depth))

        }

        return (<g>
            {getlabels}
        </g>)


    }


    drawScale() {
        let bottom = this.calcBottomofBoring();
        if (bottom < 16) {
            bottom = 16;
        }
        let getscale = [];
        let y1 = 237.91
        for (let i = 0; i <= bottom; i++) {
            getscale.push(
                <g>
                    <line className="logdraft-5" x1="1" y1={y1} x2="61" y2={y1} />
                    <rect className="logdraft-2" x="1" y={y1} width="60" height="50" />
                </g>
            )
            y1 = y1 + (50)
        
           
        }
        return (<g>
            {getscale}
        </g>)
    }






    render() {
        const ues = new UES();
        const styles = MyStylesheet();
        const userid = this.props.userid;
        const headerFont = ues.headerFont.call(this)
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        const regularFont = ues.regularFont.call(this);










        if (project) {

            const boringid = this.props.boringid;
            const boring = ues.getBoringbyID.call(this, boringid);

            if (boring) {

                let bottom = this.calcBottomofBoring();
                if (bottom < 16) {
                    bottom = 16;
                }
                const y1 = 437 + 50 * bottom
                const viewbox = `0 0 1268 ${y1}`

                return (
                    <div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>


                        <div className={`noPrint`} style={{ ...styles.alignCenter }}>
                            <Link
                                style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont, ...styles.generalColor }}
                                to={`/${userid}/projects/${projectid}`}>
                                /{project.projectnumber} - {project.title}
                            </Link>
                        </div>

                        <div className={`noPrint`} style={{ ...styles.alignCenter }}>
                            <Link
                                style={{ ...styles.generalFont, ...headerFont, ...styles.generalLink, ...styles.boldFont, ...styles.generalColor }}
                                to={`/${userid}/projects/${projectid}/borings`}>
                                /Borings
                            </Link>
                        </div>

                        <div className={`noPrint`} style={{ ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.boldFont, ...headerFont, ...styles.generalColor }} to={`/${userid}/projects/${projectid}/borings/${boringid}/samples`}>/Boring Number {boring.boringnumber} </Link>
                        </div>
                        <div className={`noPrint`} style={{ ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.boldFont, ...headerFont, ...styles.generalColor }} to={`/${userid}/projects/${projectid}/borings/${boringid}/logdraft`}>/LogDraft</Link>
                        </div>

                        {this.showTitleBlock()}
                        <div style={{ ...styles.generalContainer }}>

                            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox={viewbox}>
                                <g id="Layout">

                                    <path className="logdraft-13" d="m58.5,28.41v207H2.5V28.41h56m2-2H.5v211h60V26.41h0Z" />
                                    <text className="logdraft-8" transform="translate(36.26 223.41) rotate(-90)"><tspan x="0" y="0">DEPTH, feet</tspan></text>
                                    <text className="logdraft-9" transform="translate(911.68 232.1) rotate(-90)"><tspan x="0" y="0">SAMPLE</tspan></text>
                                    <text className="logdraft-9" transform="translate(948.68 237.41) rotate(-90)"><tspan x="0" y="0" > SAMPLE </tspan><tspan x="0" y="28.8">NUMBER</tspan></text>
                                    <text className="logdraft-9" transform="translate(1018.68 234.41) rotate(-90)"><tspan x="0" y="0">BLOW </tspan><tspan x="0" y="28.8">COUN</tspan><tspan className="logdraft-19" x="70.66" y="28.8">T</tspan></text>
                                    <text className="logdraft-8" transform="translate(120.26 220.41) rotate(-90)"><tspan x="0" y="0">GRAPHIC </tspan><tspan x="0" y="34.8">LOG</tspan></text>
                                    <path className="logdraft-13" d="m188.5,28.41v207H62.5V28.41h126m2-2H60.5v211h130V26.41h0Z" /><path className="logdraft-13" d="m888.5,28.41v207H192.5V28.41h696m2-2H190.5v211h700V26.41h0Z" />
                                    <text className="logdraft-8" transform="translate(282.95 81.18)"><tspan x="0" y="0">ENGINEERING CLASSIFIC</tspan><tspan className="logdraft-1" x="360.96" y="0">A</tspan><tspan x="378.15" y="0">TION</tspan><tspan className="logdraft-21" x="447.42" y="0"> </tspan><tspan x="453.88" y="0">AND </tspan><tspan x="158.46" y="34.8">DESCRIPTION</tspan></text>
                                    <text className="logdraft-6" transform="translate(1128.55 48.6)"><tspan x="0" y="0">TES</tspan><tspan className="logdraft-19" x="46.68" y="0">T</tspan><tspan x="60.9" y="0"> </tspan><tspan x=".89" y="28.8">D</tspan><tspan className="logdraft-1" x="18.22" y="28.8">AT</tspan><tspan className="logdraft-21" x="45.33" y="28.8">A</tspan></text>
                                    <text className="logdraft-6" transform="translate(922.81 48.6)"><tspan x="0" y="0">SAMPLE </tspan><tspan x="19.12" y="28.8">D</tspan><tspan className="logdraft-1" x="36.46" y="28.8">AT</tspan><tspan className="logdraft-21" x="63.56" y="28.8">A</tspan></text>
                                    <path className="logdraft-13" d="m1049.5,28.41v56h-157V28.41h157m2-2h-161v60h161V26.41h0Z" />
                                    <path className="logdraft-13" d="m1264.5,28.41v56h-211V28.41h211m2-2h-215v60h215V26.41h0Z" />
                                    <path className="logdraft-13" d="m919,86.91v150h-29V86.91h29m.5-.5h-30v151h30V86.41h0Z" />
                                    <path className="logdraft-13" d="m996,86.91v150h-76V86.91h76m.5-.5h-77v151h77V86.41h0Z" />
                                    <path className="logdraft-13" d="m1051,86.91v150h-54V86.91h54m.5-.5h-55v151h55V86.41h0Z" />
                                    <text className="logdraft-9" transform="translate(1073.68 233.41) rotate(-90)"><tspan x="0" y="0">MOISTURE </tspan><tspan x="0" y="28.8">CONTEN</tspan><tspan className="logdraft-19" x="101.33" y="28.8">T</tspan><tspan x="115.56" y="28.8" > %</tspan></text>
                                    <text className="logdraft-9" transform="translate(1126.68 236.41) rotate(-90)"><tspan x="0" y="0">D</tspan><tspan className="logdraft-19" x="17.33" y="0">RY</tspan><tspan x="49.8" y="0" > UNI</tspan><tspan className="logdraft-19" x="97.8" y="0">T</tspan><tspan x="112.03" y="0"> </tspan><tspan x="0" y="28.8">WIEIGH</tspan><tspan className="logdraft-18" x="88" y="28.8">T</tspan><tspan x="100" y="28.8">, pcf</tspan></text>
                                    <path className="logdraft-13" d="m1106,86.91v150h-54V86.91h54m.5-.5h-55v151h55V86.41h0Z" />
                                    <text className="logdraft-9" transform="translate(1204.68 236.41) rotate(-90)"><tspan x="0" y="0">ADDITIONA</tspan><tspan className="logdraft-20" x="130.68" y="0">L</tspan><tspan x="143.13" y="0"> </tspan><tspan x="0" y="28.8">TESTS</tspan></text>
                                    <path className="logdraft-13" d="m1161,86.91v150h-54V86.91h54m.5-.5h-55v151h55V86.41h0Z" />



                                    {this.loaddescription()}




                                    {this.loadsamplenumbers()}
                                    {this.loadspt()}
                                    {this.loadSampleTypes()}
                                    {this.loadmoisturecontent()}
                                    {this.loaddryden()}
                                    {this.loadremarks()}
                                    {this.showBoringBottom()}
                                    {this.showSampleLines()}
                                    {this.loadgraphics()}

                                    {this.drawFooter()}
                                    {this.drawLabels()}
                                    {this.drawScale()}


                                    {this.showGroundWaterSym()}

                                    <line className="logdraft-5" x1="889.5" y1="237.41" x2="1266.5" y2="237.41" />
                                  
                                    <line className="logdraft-5" x1="1267" y1="237.91" x2="1266.5" y2="86.41" />
                                </g></svg>


                        </div>

                    </div>)

            } else {

                return (<div style={{ ...styles.generalContainer }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Boring Not Found</span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found</span>
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
export default connect(mapStateToProps, actions)(LogDraft);