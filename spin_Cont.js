var spinetimer;
  Polymer({
    is: 'Dboar-header',
    behaviors: [p.card],
    properties: {
        showHeader: {
            type: Boolean,
            value: true        }
    },
    spineData :{
        type: Object,
        value: {},
    },
    groupedSpineData : {
      type: Object,
        value: {},
        notify: true,
        reflectToAttribute: true,
    },
    spinetimer : {
      type : Object,
      value : {}
    },
    isSpineCaseDataLoaded : {
        type : Boolean,
        value : false
    },

     isSpineEXDataLoaded : {
        type : Boolean,
        value : false
    },

     isSpineANDataLoaded : {
        type : Boolean,
        value : false
    },
    isSpineCaseError : {
        type : Boolean,
        value : false
    },

     isSpineEXError: {
        type : Boolean,
        value : false
    },

     isSpineANError : {
        type : Boolean,
        value : false
    },

    navigateTo :  function(type,item){
      var hlink;
      //hlink = "../" + type + "/" + item.referenceId;
      hlink = "../" + type + "/#/" + item.referenceId;
      return hlink;
    },

     popupHoverHandler :  function(e){
      $('.activePopUp').hide();
      if(this.spinetimer){
        clearTimeout(this.spinetimer);
      }
      var isContentAvailable = e.currentTarget.getAttribute('data-args').split(',')[2];
        if(Number(isContentAvailable)){
            $(e.currentTarget).find('.activePopUp').show();
        }
        
    },

    popUpOutHandler : function(e){
        var currentDomTarget = e.currentTarget;
        this.spinetimer = setTimeout(function() {
                $(currentDomTarget).find('.activePopUp').hide();
        }, 200);
    },

     popUpMouseOverHandler :  function(){
         clearTimeout(this.spinetimer);
    },

        generateBreadcrumbs: function(data) {
        this.contextData = data;
          
    },
    attached: function() {
        var self = this;
        document.querySelector("p-context-browser").style.zIndex =9999;
        document.querySelector("p-context-browser").style.position ="relative";
        setTimeout(function() {
            self.fire('spine-loaded');
        }, 2000);
    },
    detached: function() {
        this.fire('spine-unloaded');
    },
    ready: function() {
         var self = this;
         self.isSpineEXDataLoaded = false;
         self.isSpineCaseDataLoaded = false;
         self.isSpineANDataLoaded = false;
          self.addEventListener('received-spine-case-data', function(e) {

            setTimeout(function(){
                  self.isSpineCaseDataLoaded =  true;
                  self.spineCaseData = e.detail;
                  if(self.spineCaseData){
                    self.isSpineCaseError=false;
                  }else{
                    self.isSpineCaseError=true;
                  }
                },0);
        });
           self.addEventListener('received-spine-EX-data', function(e) {
            setTimeout(function(){
                  self.isSpineEXDataLoaded =  true;
                   self.spineEXData = e.detail;
                   if(self.spineEXData){
                    self.isSpineEXError=false;
                  }else{
                    self.isSpineEXError=true;
                  }
                },0);
        });
         self.addEventListener('received-spine-AN-data', function(e) {
            setTimeout(function(){
                  self.isSpineANDataLoaded =  true;
                  self.spineANData = e.detail;
                  if(self.spineANData){
                    self.isSpineANError=false;
                  }else{
                    self.isSpineANError=true;
                  }
                },0);
        });
    }
  });
