import UES from "./ues";
import { makeID } from "./functions";
class MakeID {

    projectid() {
        let projectid = false;
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        if(projects) {
            while(!projectid) {
                projectid = makeID(8)
                // eslint-disable-next-line
                projects.map(project=>{

                    if(project.projectid === projectid) {
                        projectid = false;
                    }
                })
                
            }
        } else {
            projectid = makeID(8)

        }

        return projectid;
    }

    clientid() {
        let clientid = false;
        const ues = new UES();
        const clients = ues.getClients.call(this)
        if (clients) {
            while (!clientid) {
                clientid = makeID(16)
                // eslint-disable-next-line
                clients.map(client => {

                    if (client.clientid === clientid) {
                        clientid = false;
                    }

                })

            }
        } else {
            clientid = makeID(16)
        }
        return clientid;

    }



}

export default MakeID;