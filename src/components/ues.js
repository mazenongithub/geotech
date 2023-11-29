class UES {

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


}
export default UES;