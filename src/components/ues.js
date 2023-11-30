import { LoadClients } from "./actions/api";

class UES {

    async loadClients() {

        try {

            let response = await LoadClients();
            console.log(response)
            if (response.hasOwnProperty("clients")) {
                this.props.reduxClients(response.clients);
                this.setState({ render: 'render' })
            }

        } catch (err) {
            alert(err)
        }

    }

    checkUser() {
        let myuser = false;
        if(this.props.myuser) {
            if(this.props.myuser.hasOwnProperty("userid")) {
                myuser = this.props.myuser;
            }
        }
        return myuser;
    }

    getLoginButton() {

        if (this.state.width > 1200) {
            return({width:'340px', height:'auto'})

        } else if (this.state.width > 600) {

            return({width:'240px', height:'auto'})

        } else {

            return({width:'200px', height:'auto'})

        }

    }

    removeIcon() {

        if(this.state.width>1200) {
            return({width:'50px', height:'auto'})

        } else if (this.state.width>600) {
            return({width:'40px', height:'auto'})

        } else {
            return({width:'30px', height:'auto'})

        }

    }


    arrowWidth() {

        if(this.state.width>1200) {
            return({width:'200px', height:'auto'})

        } else if (this.state.width>600) {
            return({width:'150px', height:'auto'})

        } else {
            return({width:'100px', height:'auto'})

        }

    }

    hugeFont() {
        if(this.state.width>1200) {
            return({fontSize:'42px'})

        } else if (this.state.width>600) {
            return({fontSize:'36px'})

        } else {
            return({fontSize:'30px'})

        }

        
    }

    headerFont() {

        if(this.state.width>1200) {
            return({fontSize:'36px'})

        } else if (this.state.width>600) {
            return({fontSize:'30px'})

        } else {
            return({fontSize:'24px'})

        }

    }
    checkBox() {
        return({width:'33px', height:'auto'})
    }
    regularFont() {

        if(this.state.width>1200) {
            return({fontSize:'30px'})

        } else if (this.state.width>600) {
            return({fontSize:'24px'})

        } else {
            return({fontSize:'20px'})

        }

    }

    getProjectKeybyID(projectid) {
        const ues = new UES();
        const projects = ues.getProjects.call(this);
        let key = false;
        if(projects) {
            // eslint-disable-next-line
            projects.map((project,i)=> {
                if(project.projectid === projectid) {
                    key = i
                }
            })
        }
        return key;
    }

    getProjectbyID(projectid) {
        const ues = new UES();
        const projects = ues.getProjects.call(this);
        let getproject = false;
        if(projects) {
            // eslint-disable-next-line
            projects.map(project=> {
                if(project.projectid === projectid) {
                    getproject = project;
                }
            })
        }
        return getproject;
    }

    getProjects() {
        let projects = false;
        if(this.props.projects) {
            if(this.props.projects.hasOwnProperty("length")) {
                projects = this.props.projects;
            }
        }
        return projects;
    }

    getClientKey(clientid) {
        const ues = new UES();
        const clients = ues.getClients.call(this)
        let key = false;
        if(clients) {
            // eslint-disable-next-line
            clients.map((client,i)=> {
                if(client.clientid === clientid) {

                    key = i;;

                }
            })
        }
        return key;
    }

    getClient(clientid) {
        const ues = new UES();
        const clients = ues.getClients.call(this)
        let getclient = false;
        if(clients) {
            // eslint-disable-next-line
            clients.map(client=> {
                if(client.clientid === clientid) {

                    getclient = client;

                }
            })
        }
        return getclient;
    }

    getClients() {
        let clients = false;
        if(this.props.clients) {
            if(this.props.clients.hasOwnProperty("length")) {
                clients = this.props.clients;
            }
        }

        return clients;
    }


}
export default UES;