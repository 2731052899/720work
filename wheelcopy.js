function wheelcopy(wins,opts){
    //初始化参数
    this.init(wins,opts)
    //获取窗口
    this.getWin();
    //创建盒子
    this.createBox();
    //创建轮播列表
    this.createList();
    //创建按钮
    this.createBtn();
    //自动轮播
    this.autoRun();
    //点击播放
    this.clickRun();
    this.animate(box, opts, time, fn, callback)
}
wheelcopy.prototype ={
    init(winds, opts){
        var winds = document.querySelector(winds);
        this.winds = this.winds = winds;
        this.opts = this.opts = opts;
        if (winds.nodeType != 1) {
            console.log("格式错误");
            return;
        }
      
        opts.imgs.push(opts.imgs[0]);
        opts.imgSize.push(opts.imgSize[0]);
        opts.links.push(opts.links[0]);
        opts.imgcolor.push(opts.imgcolor[0]);
        this.imgLength = opts.imgs.length;
        if (this.imgLength == 0) {
            console.log("没有传入轮播内容");
            return;
        }
        this.imgSize = opts.imgSize;
        if (!(this.imgSize instanceof Array)) {
            console.log("请传入合法的尺寸类型");
        }
        if (this.imgSize.length == 0) {
            this.imgSize[0] = document.documentElement.clientWidth;
            this.imgSize[1] = 400;
        }
        if (this.imgSize.some(function (val) {
            return val == 0;
        })) {
            for (var i = 0; i < 2; i++) {
                if (this.imgSize[i] == 0) {
                    this.imgSize[i] = 500;
                }
            }
        }
        this.imgcolor = opts.imgcolor
        this.btncolor = opts.btncolor || "green";
        this.btnactive = opts.btnactive || "red";
        this.btnPos = opts.btnPos || ["center", "20"]
        this.time = opts.runOpts.time * 1000 || 50
        this.runstyle = null
        if (opts.runOpts.runstyle == "linner" || !(opts.runOpts.runstyle)) {
            this.runstyle = Tween.Linner;
        } else if (opts.runOpts.runstyle == "in") {
            this.runstyle = Tween.Quad.easeIn;
        } else if (opts.runOpts.runstyle == "out") {
            this.runstyle = Tween.Quad.easeOut;
        }
        this.eachtime = opts.runOpts.eachtime;
        if (this.eachtime) {
            this.eachtime *= 1000;
        } else {
            this.eachtime = 500;
        }
        
        
    },
    getWin(){
        this.winds.style.cssText = "width:100%;height:" + this.imgSize[1] + "px;overflow : hidden;position:relative;";

    },
    createBox(){
       this.box = document.createElement("div");
        this.box.style.cssText = "width:" + this.imgLength * 100 + "%";
        this.winds.appendChild(this.box);
    },
    createList(){
        var c = 100 / this.imgLength;

        for (var i = 0; i < this.imgLength; i++) {
            var col = this.imgcolor[i];
            this.divlist = document.createElement("div");
            this.box.appendChild(this.divlist)

            this.divlist.style.cssText = "float:left;width:" + c + "%;height:100%;background:" + col + "";

            this.link = document.createElement("a");
            this.link.href = this.opts.links[i];
            this.divlist.appendChild(this.link)
            this.link.style.cssText = "width:" + this.imgSize[0] + "px;height:" + this.imgSize[1] + "px;display:block;margin:auto;background:url(" + this.opts.imgs[i] + ") no-repeat 0 0;"

        }
    },
   createBtn(){
       this.btnBox = document.createElement("div");
       this.btnBox.style.cssText = "width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:" + this.btnPos[1] + "px";
       this.bts = [];
       for (var i = 0; i < this.imgLength - 1; i++) {
           if (i == 0) {
              this. bgcolor = this.btnactive;
           } else {
               this. bgcolor = this.btncolor;
           }
           this.btn = document.createElement("div");
           this.btn.style.cssText = "width:30px;height:30px;background:" + this.bgcolor + ";border-radius:50%;margin:0 35px 0;cursor:pointer;float:left";
           this.btnBox.appendChild(this.btn);
           this.bts.push(this.btn);
       }
       this.winds.appendChild(this.btnBox);
      
    }     , 
    //个人发现：move中（）得不到bts的长度，move中的box无法获取到属性
    //报错wheel.js：ncaught TypeError: Cannot read property 't' of undefined
    //报错wheelcopy.js：Uncaught ReferenceError: box is not defined
    autoRun(){
        this. winw = parseInt(getComputedStyle(this.winds, null).width);
        this. num = 0;
        var b = this.bts.length;
        move = function () {
            this. num++;
         
            if (num > b-1) {


                animate(box, {
                    "margin-left": -num * this.winw
                }, this.eachtime, this.runstyle, function () {
                        this.box.style.marginLeft = 0;
                })

                num = 0;
            } else {
                animate(this.box, {
                    "margin-left": -num * this.winw
                }, this.eachtime, this.runstyle)
            }
            for (var i = 0; i < this.bts.length; i++) {
                this.bts[i].style.background = this.btnactive;
            }
            this.bts[num].style.background = this.btncolor;
        }

        var t = setInterval(move, this.time)
    },
    clickRun(){
        for (let i = 0; i < this.bts.length; i++) {
            this.bts[i].onclick = function () {
                num = i;
                animate(this.box, {
                    "margin-left": -num * this.winw
                }, this.eachtime, this.runstyle)
                for (var j = 0; j < bts.length; j++) {
                    this.bts[j].style.background = this.btnactive;
                }
                this.bts[num].style.background = this.btncolor;
            }
        }
        
       
    },
    
    animate(box, opts, time, fn, callback){
        this.obj = this.box = obj;
        clearInterval(obj.t);
        if (obj.nodeType != 1) {
            console.error("对象类型不对");
            return;
        }
        var start = {};
        var change = {};
        var time = 0;
        var fn = fn || Tween.Linear;

        for (var i in attrObj) {
            start[i] = parseInt(getComputedStyle(obj, null)[i]);
            change[i] = attrObj[i] - start[i];
        }
        obj.t = setInterval(function () {
            time += 50;
            for (var i in attrObj) {
                obj.style[i] = fn(time, start[i], change[i], duration) + "px"
            }
            if (time >= duration) {
                for (var i in attrObj) {
                    obj.style[i] = attrObj[i] + "px"
                }
                clearInterval(obj.t);
                if (callback) {
                    callback();
                }
            }
        }, 50)
    }
}
