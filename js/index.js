/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var SettupManager = {
    settupList: [],
    settup: function(){
        this.settupList.forEach(function(item, index){
            item();
        });
    },
    addHandler: function(handler){
        this.settupList.push(handler);
    }
}

var LoadContent = function(file, callback){
    var client = new XMLHttpRequest();
    client.open('GET', file);
    client.onreadystatechange = function() {
      callback(client.responseText);
    }
    client.send();
}

var app = {
    // Application Constructor
    initialize: function() {
        SettupManager.settup();
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        borderAction.toggleLoadingIcon(false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        page.loadDone();

        console.log('Received Event: ' + id);
    }
};

var borderAction = {
    initialize: function(){
        this.toggleLoadingIcon(true);
    },

    toggleLoadingIcon: function(bool) {
        DOMToggler.toggle("loadingIcon", bool);
    }
};
SettupManager.addHandler(function(){borderAction.initialize();});

var DOMToggler = {
    toggle: function(id, bool){
        if(bool){
            document.getElementById(id).setAttribute('style', 'display:block');
        }else{
            document.getElementById(id).setAttribute('style', 'display:none');
        }
        console.log("Toggle "+id+" to "+bool);
    }
};

var page = {
    autodisable: [],
    settupPage: function(){
        console.log("Setting up page...");
        this.autodisable.forEach(function(item, index){DOMToggler.toggle(item, false);});
        
    },
    loadDone: function(){
        DOMToggler.toggle("app-home",true);
        DOMToggler.toggle("app",false);
    },
    submitQuiz: function(){
        var don=document.getElementById("quiz-item-submit");
        don.classList.toggle("menu_navigate", true);
        setTimeout(function(){don.classList.toggle("menu_navigate", false);
                              document.getElementById("app-content").style.display="none";
                              document.getElementById("app-content-clean").style.display="block";
                    },500);
        
        //document.getElementById('textbox_id').value
    }
};
SettupManager.addHandler(function(){page.settupPage();});

var menu = {
    isToggled: false,
    dobj: null,
    cvib: null,
    toggle: function(){
        if(this.isToggled){
            this.isToggled = false;
        }else {
            this.isToggled = true;
        }
    },
    fadeIn: function(){
        this.dobj.classList.toggle("menu_out", false);
        this.dobj.classList.toggle("menu_in", true);
        this.cvib.classList.toggle("menu_out_blocker", false);
        this.cvib.classList.toggle("menu_in_blocker", true);
        this.dobj.parentElement.style.display="block";
    },
    fadeOut: function(){
        this.dobj.classList.toggle("menu_in", false);
        this.dobj.classList.toggle("menu_out", true);
        this.cvib.classList.toggle("menu_in_blocker", false);
        this.cvib.classList.toggle("menu_out_blocker", true);
        setTimeout(function(){menu.dobj.parentElement.style.display="none";},500);
    },
    onClick: function(){
        menu.toggle();
        if(this.dobj==null){
            this.dobj=document.getElementById("app-menu-content");
        }
        if(this.cvib==null){
            this.cvib=document.getElementById("app-menu-pageblock");
        }
        if(menu.isToggled){
            DOMToggler.toggle("app-menu-pageblock", true);
        }else{
            setTimeout(function(){DOMToggler.toggle("app-menu-pageblock", false);},500);
        }
        if(this.isToggled){
            this.fadeIn();
        }else{
            this.fadeOut();
        }
    },
    navigate: function(don, npn){
        don=document.getElementById(don);
        don.classList.toggle("menu_navigate", true);
        setTimeout(function(){don.classList.toggle("menu_navigate", false);menu.isToggled=true;menu.onClick();},500);

    }
};

var header = {

    init: function(){
        setInterval(function(){header.setDate();
        header.setTime()},1000);
    },
    setDate: function(){
        var d = new Date();
        var y = d.getYear()+1900;
        var t = d.getDate();
        var m = d.getMonth()+1;
        var o = document.getElementById("app-header-date");
        o.innerHTML = this.format2Two(t)+"."+this.format2Two(m)+"."+y;
    },
    setTime: function(){
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var a = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"];
        var i = a[d.getDay()-1];
        var o = document.getElementById("app-header-daytime");
        o.innerHTML = i+" | "+this.format2Two(h)+":"+this.format2Two(m);
    },
    format2Two: function(txt){
        if(txt.toString().length<2){
            return "0"+txt;
        }
        return txt;
    }
};
SettupManager.addHandler(function(){header.init();});