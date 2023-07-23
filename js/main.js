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
    ]
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


const controller = {
    init() {
        view.init();
    },

    getCurrentProject() {
        return model.projects[this.getCurrentProjectIndex()];
    },

    getCurrentProjectIndex() {
        return model.currentProjectIndex;
    },

    setCurrentProjectIndex(index) {
        model.currentProjectIndex = index;
    }
};
controller.init();