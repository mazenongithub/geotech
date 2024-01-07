import React, { Component } from 'react';
import * as actions from './actions';
import { connect } from 'react-redux';
import { MyStylesheet } from './styles'
import { Link } from 'react-router-dom';
import UES from './ues';
import { milestoneformatdatestring, calcdryden, moist, convertDegree } from './functions'
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
            <foreignObject x="1238.58" y={`${Math.ceil(550 + (40 * depth))}`} width="120" height="700">
                <div style={{ ...styles.alignCenter, ...styles.generalContainer }}>
                    <text className="logdraft-6"><tspan x="0" y="0">{samplenos}</tspan></text>
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
            <foreignObject x="185.5" y={`${Math.ceil(545 + (40 * depth))}`} width="698" height="700">
                <div>
                    <text className='logdraft-6 regularFont'><tspan x="0" y="0">{description}</tspan></text>
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
                <foreignObject x="1350" y={`${Math.ceil(550 + (40 * depth))}`} width="80" height="700">
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>

                        <text className="logdraft-6"><tspan x="0" y="0">{spt}</tspan></text>
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

                <foreignObject x="1440.02" y={`${Math.ceil(550 + (40 * depth))}`} width="55" height="700">
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <text className="logdraft-6"><tspan x="0" y="0">{moisturecontent}</tspan></text>
                    </div>
                </foreignObject>)
        }

    }

    showdryden(dryden, depth) {
        const styles = MyStylesheet();
        if (Number(dryden > 0)) {

            return (
                <foreignObject x="1498.35" y={`${Math.ceil(550 + (40 * depth))}`} width="80" height="700">
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <text className="logdraft-6"><tspan x="0" y="0">{dryden}</tspan></text>
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
            return (<foreignObject x="1579.5" y={`${Math.ceil(550 + (40 * depth))}`} width="125" height="600">
                <div style={{ ...styles.generalContainer }}>
                    <text className="logdraft-6"><tspan x="0" y="0">{remarks}</tspan></text>
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
        const y1 = Math.ceil(560 + (40 * depth))
        const boring = this.getBoring();
        let groundwater = ' Groundwater was not encountered '
        if (boring) {
            if (Number(boring.gwdepth) > 0) {
                const gwdepth = Number(boring.gwdepth).toFixed(1)
                groundwater = ` Groundwater was was encounted at ${gwdepth} feet. `

            }




            if(Number(depth)>0) {
            return (

                <g transform={`translate(60.5 ${y1})`}>
                    <line className="logdraft-12" x1={0} y1={0} x2={1135.5} y2={0} />
                    <text className="logdraft-6"><tspan x="135" y="20">Bottom of Boring at {depth} feet below ground surface. {groundwater}</tspan></text>
                </g>


            )

            }

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
        const height = sptlength * 40;
        return (
            <g id="Layout" transform={`translate(1197 ${558 + 40 * depth})`}>
                <rect className="liner-1" x="1" y="1" width="40" height={height} />
                <line className="liner-1" x1="5" y1="1" x2="5" y2={height + 3} />
                <line className="liner-1" x1="9.4" y1="1" x2="9.4" y2={height + 3} />
                <line className="liner-1" x1="13.8" y1="1" x2="13.8" y2={height + 3} />
                <line className="liner-1" x1="18.2" y1="1" x2="18.2" y2={height + 3} />
                <line className="liner-1" x1="22.6" y1="1" x2="22.6" y2={height + 3} />
                <line className="liner-1" x1="27" y1="1" x2="27" y2={height + 3} />
                <line className="liner-1" x1="31" y1="1" x2="31" y2={height + 3} />
                <line className="liner-1" x1="35" y1="1" x2="35" y2={height + 3} />
                <line className="liner-1" x1="39" y1="1" x2="39" y2={height + 3} />
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
            <g transform="translate(59 561)">
                <foreignObject width="118" height={(y2 - y1) * 40} x="0" y={y1 * 40}>
                    <div style={style}>
                        &nbsp;
                    </div>
                </foreignObject>
            </g>)

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
        if (boring) {
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
                        <div className={`print-adj`}>

                            <div style={{ ...styles.generalContainer }}>

                                <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1678.48 2161.5"><defs><style>
                                </style></defs>
                                    <g id="Layout">
                                        <text className="logdraft-2" transform="translate(326.51 421.76)"><tspan x="0" y="0">ENGINEERING CLASSIFIC</tspan><tspan className="logdraft-11" x="360.96" y="0">A</tspan><tspan x="378.15" y="0">TION</tspan><tspan className="logdraft-20" x="447.42" y="0"> </tspan><tspan x="453.88" y="0">AND DESCRIPTION</tspan></text>
                                        <text className="logdraft-5" transform="translate(1517.13 2136.98)"><tspan x="0" y="0">FIGURE {boring.figure}</tspan></text>
                                        <polyline className="logdraft-9" points="47.46 2048.63 55.59 2050.04 67.49 2051.85 81.38 2053.05 75.23 2067.72 67.1 2082.79 49.64 2105.29 47.46 2097.65" />
                                        <polygon className="logdraft-9" points="111.33 2051.25 127.8 2048.63 127.8 2066.51 127.8 2091.43 127.8 2099.31 124.92 2107.6 119.57 2117.54 111.98 2126.58 99.33 2135.62 97.7 2120.86 98.74 2096.15 103.2 2074.45 111.33 2051.25" />
                                        <polygon className="logdraft-10" points="64.42 2127.19 60.05 2123.57 54.55 2116.64 61.99 2106.69 70.32 2092.13 78.06 2076.96 84.31 2060.89 87.13 2052.75 93.08 2052.75 82.67 2081.68 75.83 2098.86 64.42 2127.19" />
                                        <polygon className="logdraft-10" points="99.18 2052.75 104.84 2052 100.52 2064.51 97.7 2073.85 93.08 2088.16 89.96 2101.72 88.17 2113.47 87.13 2127.19 86.39 2141.5 71.96 2133.51 77.91 2115.28 85.5 2092.13 93.08 2070.38 99.18 2052.75" />
                                        <polygon className="logdraft-9" points="272.61 2066.92 232.54 2066.92 227.13 2067.67 221.63 2070.53 218.65 2074.75 217.46 2080.03 217.46 2111.21 218.36 2115.43 222.07 2120.86 229.81 2124.02 272.61 2124.02 272.61 2111.52 233.98 2111.21 231.45 2109.71 230.85 2100.97 272.61 2100.52 272.61 2088.91 231.15 2089.52 231.15 2081.98 232.49 2079.87 236.51 2079.42 272.61 2078.97 272.61 2066.92" />
                                        <polygon className="logdraft-9" points="322.2 2083.94 336.04 2083.94 336.04 2078.52 334.55 2073.7 332.32 2070.98 328.01 2068.12 323.84 2066.92 292.6 2066.92 286.79 2068.27 282.93 2071.59 280.55 2076.56 279.95 2083.94 279.95 2089.52 281.29 2093.44 283.97 2097.35 290.07 2100.37 318.63 2100.37 320.86 2101.87 321.61 2104.43 321.61 2108.35 320.57 2110.76 296.46 2110.76 294.38 2109.71 293.64 2107.15 279.95 2107.6 279.95 2110.76 280.84 2114.68 282.93 2119.2 288.13 2122.52 292 2124.02 323.84 2124.02 329.49 2121.91 334.55 2116.94 336.04 2111.82 336.04 2101.87 333.96 2096.75 330.98 2093.13 325.92 2090.42 320.42 2089.82 297.06 2089.97 294.38 2088.46 293.49 2083.64 294.68 2080.93 295.87 2079.27 318.04 2079.27 319.97 2079.72 321.76 2081.53 322.2 2083.94" />
                                        <polygon className="logdraft-9" points="153.49 2066.92 167.03 2066.92 167.03 2107.9 168.51 2110.46 171.49 2111.82 191.28 2111.82 194.1 2110.16 195.59 2108.95 195.59 2066.92 209.43 2066.92 209.43 2088.46 209.43 2108.35 208.54 2114.83 206.3 2118.6 203.03 2121.31 197.53 2124.02 194.4 2124.02 166.28 2124.02 159.29 2121.61 154.23 2115.43 153.49 2110.16 153.49 2066.92" />
                                        <line className="logdraft-13" x1="343.38" y1="2110.47" x2="349.55" y2="2110.47" />
                                        <line className="logdraft-13" x1="346.47" y1="2118.01" x2="346.47" y2="2110.47" />
                                        <line className="logdraft-13" x1="350.97" y1="2118.27" x2="350.97" y2="2110.47" />
                                        <line className="logdraft-13" x1="354.65" y1="2117.67" x2="352.01" y2="2110.47" />
                                        <line className="logdraft-13" x1="357.7" y1="2110.47" x2="354.65" y2="2117.67" />
                                        <line className="logdraft-13" x1="358.48" y1="2118.01" x2="358.29" y2="2110.47" />
                                        <line className="logdraft-13" x1="350.97" y1="2110.47" x2="352.01" y2="2110.47" />
                                        <line className="logdraft-13" x1="357.7" y1="2110.47" x2="358.29" y2="2110.47" />
                                        <text className="logdraft-2" transform="translate(45.74 545.23) rotate(-90)"><tspan x="0" y="0">DEPTH, feet</tspan></text>
                                        <text className="logdraft-3" transform="translate(1224.66 554.45) rotate(-90)"><tspan x="0" y="0">SAMPLE</tspan></text>
                                        <text className="logdraft-3" transform="translate(1283.08 555.5) rotate(-90)"><tspan x="0" y="0">SAMPLE </tspan><tspan x="0" y="28.8">NUMBER</tspan></text>
                                        <text className="logdraft-3" transform="translate(1383.08 555.5) rotate(-90)"><tspan x="0" y="0">BLOW </tspan><tspan x="0" y="28.8">COUN</tspan><tspan className="logdraft-18" x="70.66" y="28.8">T</tspan></text>
                                        <text className="logdraft-2" transform="translate(91.96 546.5) rotate(-90)"><tspan x="0" y="0">GRAPTHIC </tspan><tspan x="0" y="34.8">LOG</tspan></text>
                                        <path className="logdraft-8" d="m177.23,341.75v218.5H58.73v-218.5h118.5m.75-.75H57.98v220h120v-220h0Z" />
                                        <path className="logdraft-8" d="m57.23,341.75v218.5H18.73v-218.5h38.5m.75-.75H17.98v220h40v-220h0Z" />
                                        <path className="logdraft-8" d="m1196.98,342v218H178.98v-218h1018m1-1H177.98v220h1020v-220h0Z" />
                                        <text className="logdraft-1" transform="translate(29.92 751.21)"><tspan x="0" y="0">5</tspan></text>
                                        <text className="logdraft-1" transform="translate(20.33 951.21)"><tspan x="0" y="0">10</tspan></text>
                                        <text className="logdraft-1" transform="translate(20.33 1149.14)"><tspan x="0" y="0">15</tspan></text>
                                        <text className="logdraft-1" transform="translate(22.35 1351.21)"><tspan x="0" y="0">20</tspan></text>
                                        <text className="logdraft-1" transform="translate(22.35 1551.21)"><tspan x="0" y="0">25</tspan></text>
                                        <text className="logdraft-1" transform="translate(22.35 1751.21)"><tspan x="0" y="0">30</tspan></text>
                                        <text className="logdraft-1" transform="translate(22.35 1951.21)"><tspan x="0" y="0">35</tspan></text>
                                        <text className="logdraft-4" transform="translate(1496.55 380.89)"><tspan x="0" y="0">TES</tspan><tspan className="logdraft-18" x="46.68" y="0">T</tspan><tspan x="60.9" y="0" > D</tspan><tspan className="logdraft-11" x="84.9" y="0">AT</tspan><tspan className="logdraft-20" x="112.01" y="0">A</tspan></text>
                                        <text className="logdraft-4" transform="translate(1238.31 380.89)"><tspan x="0" y="0">SAMPLE D</tspan><tspan className="logdraft-11" x="121.37" y="0">AT</tspan><tspan className="logdraft-20" x="148.48" y="0">A</tspan></text>
                                        <path className="logdraft-8" d="m1236.98,401v159h-38v-159h38m1-1h-40v161h40v-161h0Z" />
                                        <path className="logdraft-8" d="m1356.98,401v159h-118v-159h118m1-1h-120v161h120v-161h0Z" />
                                        <path className="logdraft-8" d="m1437.98,401v159h-79v-159h79m1-1h-81v161h81v-161h0Z" />
                                        <text className="logdraft-3" transform="translate(1460.16 556.66) rotate(-90)"><tspan x="0" y="0">MOISTURE </tspan><tspan x="0" y="28.8">CONTEN</tspan><tspan className="logdraft-18" x="101.33" y="28.8">T</tspan><tspan x="115.56" y="28.8" > %</tspan></text>
                                        <text className="logdraft-3" transform="translate(1525.21 556.76) rotate(-90)"><tspan x="0" y="0">D</tspan><tspan className="logdraft-18" x="17.33" y="0">RY</tspan><tspan x="49.8" y="0" > UNI</tspan><tspan className="logdraft-18" x="97.8" y="0">T</tspan><tspan x="112.03" y="0"> </tspan><tspan x="0" y="28.8">WIEIGH</tspan><tspan className="logdraft-17" x="88" y="28.8">T</tspan><tspan x="100" y="28.8">, pcf</tspan></text>
                                        <path className="logdraft-8" d="m1496.98,401v159h-57v-159h57m1-1h-59v161h59v-161h0Z" />
                                        <path className="logdraft-8" d="m1576.98,401v159h-78v-159h78m1-1h-80v161h80v-161h0Z" /><path className="logdraft-8" d="m1676.98,401v159h-98v-159h98m1-1h-100v161h100v-161h0Z" />
                                        <text className="logdraft-3" transform="translate(1625.92 556) rotate(-90)"><tspan x="0" y="0">ADDITIONA</tspan><tspan className="logdraft-19" x="130.68" y="0">L</tspan><tspan x="143.13" y="0"> </tspan><tspan x="0" y="28.8">TESTS</tspan></text>
                                        <text className="logdraft-6" transform="translate(22.69 326.12)"><tspan x="0" y="0">Remarks:</tspan></text><text className="logdraft-6" transform="translate(115.91 326.12)"><tspan x="0" y="0">{boring.remarks}</tspan></text>
                                        <text className="logdraft-6" transform="translate(22.69 285.74)"><tspan x="0" y="0">Groundwater Depth [Elevation]: </tspan></text><text className="logdraft-6" transform="translate(156.68 248.66)"><tspan x="0" y="0">{boring.drillrig}</tspan></text>
                                        <text className="logdraft-6" transform="translate(307.31 287.44)"><tspan x="0" y="0">{boring.gwdepth}</tspan></text><text className="logdraft-6" transform="translate(22.69 166.74)"><tspan x="0" y="0">Date Drilled</tspan></text>
                                        <text className="logdraft-6" transform="translate(22.69 209.43)"><tspan x="0" y="0">Drill Method:</tspan></text><text className="logdraft-6" transform="translate(22.69 249.43)"><tspan x="0" y="0">Drill Rig</tspan><tspan className="logdraft-18" x="70" y="0"> </tspan><tspan className="logdraft-20" x="75.2" y="0">T</tspan><tspan x="86.31" y="0">ype:</tspan></text><text className="logdraft-6" transform="translate(574.62 247.87)"><tspan x="0" y="0">Diameter of Hole:</tspan></text>
                                        <text className="logdraft-6" transform="translate(141.74 209.43)">{boring.drillmethod}</text>
                                        <text className="logdraft-6" transform="translate(574.62 207.87)"><tspan x="0" y="0">Drilling Contractor:</tspan></text>
                                        <text className="logdraft-6" transform="translate(758.4 207.61)"><tspan x="0" y="0">{boring.contractor}</tspan></text>
                                        <text className="logdraft-6" transform="translate(744.42 251.98)"><tspan x="0" y="0">{boring.diameter}</tspan></text>
                                        <text className="logdraft-6" transform="translate(139.03 165.32)"><tspan x="0" y="0">{(boring.datedrilled)}</tspan></text>
                                        <text className="logdraft-6" transform="translate(574.62 167.87)"><tspan x="0" y="0">Logged By:</tspan></text>
                                        <text className="logdraft-6" transform="translate(686.59 169.41)"><tspan x="0" y="0">{boring.loggedby}</tspan></text>
                                        <text className="logdraft-6" transform="translate(1127.98 168.09)"><tspan x="0" y="0">Checked By:</tspan></text>
                                        <text className="logdraft-6" transform="translate(1270.77 169.41)"><tspan x="0" y="0">{boring.checkedby}</tspan></text>
                                        <text className="logdraft-6" transform="translate(1361.69 206.14)"><tspan x="0" y="0">{bottom}</tspan></text>
                                        <text className="logdraft-6" transform="translate(1481.47 248.43)"><tspan x="0" y="0">{boring.elevation} </tspan></text>
                                        <text className="logdraft-16" transform="translate(1234.86 25.68)"><tspan x="0" y="0">LOG OF SOI</tspan><tspan className="logdraft-18" x="140" y="0">L</tspan><tspan x="154.23" y="0" > BORING B{boring.boringnumber}    </tspan></text>
                                        <text className="logdraft-16" transform="translate(26.98 39.68)"><tspan x="0" y="0" >Project:     </tspan></text>
                                        <text className="logdraft-16" transform="translate(143.48 39.68)"> {project.title} </text>
                                        <text className="logdraft-16" transform="translate(26.98 81.68)"><tspan x="0" y="0">Project Location:   </tspan></text>
                                        <text className="logdraft-16" transform="translate(248.48 81.68)"><tspan x="0" y="0" >{project.address} {project.city},{project.projectstate}  </tspan></text><text className="logdraft-16" transform="translate(26.98 120.68)"><tspan x="0" y="0" >Project Number:   </tspan></text><text className="logdraft-16" transform="translate(248.48 120.68)"><tspan x="0" y="0" >{project.projectnumber}  </tspan></text><text className="logdraft-6" transform="translate(673.39 328.01)"><tspan x="0" y="0">{convertDegree(boring.latitude)} N</tspan></text>
                                        <text className="logdraft-6" transform="translate(820.51 328.01)"><tspan x="0" y="0">{convertDegree(boring.longitude)} W</tspan></text><text className="logdraft-6" transform="translate(574.62 325.44)"><tspan x="0" y="0">Location:</tspan></text>
                                        <text className="logdraft-6" transform="translate(753.49 286.03)"><tspan x="0" y="0" >{boring.samplingmethod}</tspan></text>
                                        <text className="logdraft-6" transform="translate(574.62 284.26)"><tspan x="0" y="0">Sampling Methods:</tspan></text><text className="logdraft-6" transform="translate(1127.98 325.35)"><tspan x="0" y="0">Driving Method and Drop</tspan></text><text className="logdraft-6" transform="translate(1127.98 286.42)"><tspan x="0" y="0">Drill Hole Backfill:</tspan></text>
                                        <text className="logdraft-6" transform="translate(1370.48 326.73)">{boring.drivingmethod}</text>
                                        <text className="logdraft-6" transform="translate(1305.48 285.05)"><tspan x="0" y="0">{boring.backfill}</tspan></text><text className="logdraft-6" transform="translate(1127.98 247.56)"><tspan x="0" y="0">Approx. Surface Elevation, ft WSG 84:</tspan></text>
                                        <text className="logdraft-6" transform="translate(1127.98 204.36)"><tspan className="logdraft-17" x="0" y="0">T</tspan><tspan x="10" y="0">otal Depth of Drill Hole:</tspan></text><rect className="logdraft-12" x="17.98" y="1" width="1660" height="2160" /><rect className="logdraft-12" x="18.48" y=".5" width="1039" height="140" /><rect className="logdraft-12" x="1057.98" y="1" width="620" height="140" /><rect className="logdraft-12" x="18.48" y="141" width="553.17" height="40" /><rect className="logdraft-12" x="571.65" y="141" width="553.17" height="40" /><rect className="logdraft-12" x="1124.81" y="141" width="553.17" height="40" /><rect className="logdraft-12" x="18.48" y="181" width="553.17" height="40" /><rect className="logdraft-12" x="571.65" y="181" width="553.17" height="40" /><rect className="logdraft-12" x="1124.81" y="181" width="553.17" height="40" /><rect className="logdraft-12" x="18.48" y="221" width="553.17" height="40" /><rect className="logdraft-12" x="571.65" y="221" width="553.17" height="40" /><rect className="logdraft-12" x="1124.81" y="221" width="553.17" height="40" /><rect className="logdraft-12" x="18.48" y="261" width="553.17" height="40" /><rect className="logdraft-12" x="571.65" y="261" width="553.17" height="40" /><rect className="logdraft-12" x="1124.81" y="261" width="553.17" height="40" /><rect className="logdraft-12" x="18.48" y="301" width="553.17" height="40" /><rect className="logdraft-12" x="571.65" y="301" width="553.17" height="40" /><rect className="logdraft-12" x="1124.81" y="301" width="553.17" height="40" /><line className="logdraft-12" x1="18.48" y1="2040.5" x2="1678.48" y2="2040.5" /><rect className="logdraft-14" x="1197.98" y="342" width="241" height="58" /><rect className="logdraft-12" x="1438.98" y="342" width="239" height="58" />
                                        <rect className="logdraft-12" x="17.98" y="561" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="601" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="641" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="681" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="721" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="761" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="801" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="841" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="881" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="921" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="961" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1001" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1041" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1081" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1121" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1161" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1201" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1241" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1281" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1321" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1361" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1401" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1441" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1481" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1521" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1561" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1601" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1641" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1681" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1721" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1761" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1801" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1841" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1881" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1921" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="1961" width="40" height="40" />
                                        <rect className="logdraft-12" x="17.98" y="2001" width="40" height="40" />
                                        <line className="logdraft-12" x1="177.98" y1="561" x2="177.98" y2="2040.5" />
                                        <line className="logdraft-12" x1="1197.98" y1="561" x2="1197.98" y2="2040.5" />
                                        <line className="logdraft-12" x1="1237.98" y1="561" x2="1237.98" y2="2040.5" />
                                        <line className="logdraft-12" x1="1357.98" y1="561" x2="1357.98" y2="2040.5" />
                                        <line className="logdraft-12" x1="1438.98" y1="561" x2="1438.98" y2="2040.5" />
                                        <line className="logdraft-12" x1="1497.98" y1="561" x2="1497.98" y2="2040.5" />
                                        <line className="logdraft-12" x1="1577.98" y1="561" x2="1577.98" y2="2040.5" />
                                        <line className="logdraft-15" x1="17.98" y1="761" x2="57.98" y2="761" />
                                        <line className="logdraft-15" x1="17.98" y1="961" x2="57.98" y2="961" />
                                        <line className="logdraft-15" x1="17.98" y1="1161" x2="57.98" y2="1161" />
                                        <line className="logdraft-15" x1="17.98" y1="1361" x2="57.98" y2="1361" />
                                        <line className="logdraft-15" x1="17.98" y1="1561" x2="57.98" y2="1561" />
                                        <line className="logdraft-15" x1="17.98" y1="1761" x2="57.98" y2="1761" />
                                        <line className="logdraft-15" x1="17.98" y1="1961" x2="57.98" y2="1961" />
                                        {this.loaddescription()}
                                        {this.loadSampleTypes()}
                                        {this.loadsamplenumbers()}
                                        {this.loadspt()}
                                        {this.loadmoisturecontent()}
                                        {this.loaddryden()}
                                        {this.loadremarks()}
                                        {this.loadgraphics()}
                                        {this.showBoringBottom()}
                                        
                                        
                                        </g>
        
                                        </svg>
                            </div>

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