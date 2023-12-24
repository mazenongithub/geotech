import UES from "./ues";
class GenerateReport {

    authorization() {
        const ues = new UES();
        const projectid = this.props.projectid;
        let authorization = ``;
        let authorized = '';
        let proposalnumber = '';
        const project = ues.getProjectbyID.call(this,projectid)
        if(project) {
            authorization +=`UES has completed a field exploration and geotechnical evaluation for the ${project.title} project. `
        
            const clientid = project.clientid;
            const client = ues.getClient.call(this,clientid);
            if(client) {
            authorization += `${client.prefix} ${client.firstname} ${client.lastname} authorized UES Services on ${authorized} by signing UES Proposal No. ${proposalnumber}`

            }
        
        
        }
        return authorization;
    }





}

export default GenerateReport;