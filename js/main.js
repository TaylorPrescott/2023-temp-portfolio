const model = {
    currentProjectIndex: null,
    projects: [
        {
            info: "Multi Step Form - HTML, CSS, JavaScript",
            imgPath: "../assets/imgs/MultiStepForm.png",
            demoURL: "http://ccs.com",
            githubURL: "https://github.com"
        },
        {
            info: "Age Calculator  - WebAsm",
            imgPath: "../assets/imgs/Age-Calc-Project.png",
            demoURL: "http://ccs.com",
            githubURL: "https://github.com"
        },
        {
            info: "QR Code Component  - Vanilla JS with Custom Engine",
            imgPath: "../assets/imgs/QR-Code-Project.png",
            demoURL: "http://ccs.com",
            githubURL: "https://github.com"
        },
        {
            info: "Display Results Component - React, Redux, Redux Toolkit",
            imgPath: "../assets/imgs/Results-Project.png",
            demoURL: "http://ccs.com",
            githubURL: "https://github.com"
        }
    ],
    formData: {
        name: "",
        email: "",
        msg: ""
    }
};


const view = {
    init() {
        const btns = document.querySelector(".btns");
        this.backBtn = btns.children[0];
        this.nextBtn = btns.children[1];
        this.projectInfo = document.querySelector(".project-info");
        this.currentProjectEl = document.getElementById("currentProject");

        this.backBtn.addEventListener("click", this.handleBackClick);
        this.nextBtn.addEventListener("click", this.handleNextClick);

        let rndIndex = Math.floor(Math.random() * model.projects.length);
        controller.setCurrentProjectIndex(rndIndex);

        this.render();
    },

    handleBackClick() {
       if (model.currentProjectIndex >= 1) {
            model.currentProjectIndex = model.currentProjectIndex - 1;
       } else {
            model.currentProjectIndex = model.projects.length - 1;
       }
       view.render();
    },

    handleNextClick() {
        if (model.currentProjectIndex < model.projects.length - 1) {
            model.currentProjectIndex = model.currentProjectIndex + 1;
        } else {
            model.currentProjectIndex = 0;
        }
        view.render();
    },

    render() {
        this.projectInfo.textContent = controller.getCurrentProject().info;
        this.currentProjectEl.children[0].src = controller.getCurrentProject().imgPath;
        this.currentProjectEl.children[1].setAttribute("href", controller.getCurrentProject().demoURL);
        this.currentProjectEl.children[2].href = controller.getCurrentProject().githubURL;
    }
};

const formView = {
    init() {
        this.form = document.getElementsByTagName("form")[0];
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            if (this.validate()) {
                controller.setFormData(this.form.children[1].value, this.form.children[3].value, this.form.children[5].value);
                formView.render();
                this.form.reset();
            }
        });
    },

    validate() {
        const name = this.form.children[1].value;
        const email = this.form.children[3].value;
        const msg = this.form.children[5].value;
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const msgRegEx = /([\.\<\>"\(\)\\'\=\|])/;

        let errorEl;
        let msgEl;
        let errorMsg = "";
        let valid = false;

        if (document.getElementById("error-wrapper")) {
            msgEl = document.getElementById("error-wrapper");
            msgEl.textContent = "";
        } else {
            msgEl = document.createElement("p");
            msgEl.id = "error-wrapper";
            msgEl.classList.add("error-msg");
        }

        if (name === "" || name === undefined) {
            errorMsg = "Must provide a name.";
        } else if (!emailRegEx.test(email)) {
            errorMsg = "Invalid email."
        } else if (msgRegEx.test(msg)) {
            errorMsg = "Invalid characters.";
        } else if (msg === "" || msg === undefined) {
            errorMsg = "Must contain message.";
        } else {
            return true;
        }


        msgEl.textContent = errorMsg;
        document.getElementById("contact").children[2].appendChild(msgEl);
        return valid;
    },

    async send(formData) {
        const response = await fetch("https://hellotaylor.space/priv/handler.php", {
            method: "POST",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "manual",
            referrerPolicy: "no-referrer-when-downgrade",
            body: JSON.stringify(formData)
        });
        return response.json();
    },

    render() {
        const formData = {...controller.getFormData()};
        this.send(formData).then(data => console.log(data)).catch(e => console.log("Error Posting: " + e));
        const pEl = document.createElement("p");
        for (let i = 0; i < 7; i++) {
            this.form.children[i].classList.add("hide");
        }
        pEl.textContent = `Thanks, ${controller.getFormUsersName()}. A response will be sent to the email provided.`;
        pEl.classList.add("thanks-msg");
        this.form.append(pEl);
    }
};

const controller = {
    init() {
        view.init();
        formView.init();
    },

    getCurrentProject() {
        return model.projects[this.getCurrentProjectIndex()];
    },

    getCurrentProjectIndex() {
        return model.currentProjectIndex;
    },

    setCurrentProjectIndex(index) {
        model.currentProjectIndex = index;
    },
    //remove
    getFormUsersName() {
        return model.formData.name;
    },
    getFormData() {
        return model.formData;
    },
    setFormData(name, email, msg) {
        model.formData.name = name;
        model.formData.email = email;
        model.formData.msg = msg;
    }

};
controller.init();