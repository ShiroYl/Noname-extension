game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"真白原神V1",content:function(config,pack){
        lib.groupnature.lv='soil';
        lib.group.push('lv');
        lib.translate['lv']='旅';
        lib.translate['lv2']='旅者';
        lib.groupnature.fd='water';
        lib.group.push('fd');
        lib.translate['fd']='枫';
		lib.translate['fd2']='枫丹';
// 死亡语音
   game.N_playDieAudio=function(playerID){
	if (lib.config.background_speak){
	    game.playAudio('..','extension','真白原神V1', 'die', playerID+'.mp3');
	}
	};
	lib.skill._ndieaudio2={
	    trigger:{player:'dieBegin',},
	    priority:2,
	    forced:true,
	    content:function(){
	        game.N_playDieAudio(trigger.player.name);
	    }
	};
},precontent:function(){
    
},help:{},config:{},package:{
    character:{
        character:{
            paimengZB:["female","lv",4,["huobanZB","tanchiZB","danxiaoZB","liangjiangZB"],["des:旅行者在旅途中捡到的奇妙生物，同时也是旅行者前往第一座城市的引路人。白色及肩发，眼睛与背后的小披风一样，是有星空纹理的黑蓝色，不过更加地深邃神秘。远处看是蓝瞳，当有些剧情拉近了视角的话，可以看见眼中神秘的星辰。是个话痨、急性子、贪吃、小财迷，因为旅行者很多台词都被派蒙抢了，所以显得派蒙话很多。"]],
            navilletteZB:["male","fd",4,["zhongjiZB","chaoshuiZB"],["des:那维莱特，枫丹最高审判官 ，水龙王 ，因其无懈可击的“秉公无私”而闻名 。那维莱特严肃且公正 ，说是枫丹“公正”的象征也不为过。他拥有强大的持续水元素攻击，让敌人难以抵挡，但这也让他付出了一定的代价。"]],
			furinaZB: ["female", "fd", 3, ["qifenZhiZB","qifenZhiZB_reset","qifenExtraDamage", "wanzhongkuanghuanZB"],["des:芙宁娜，魔神名芙卡洛斯，是水神“芙卡洛斯”的人类分身与扮演者。曾经统治着水之国枫丹，退位后，芙宁娜不再扮演水神，过上普通人的生活。她可以巧妙运用元素爆发，让她兼顾强大的攻击和生存恢复能力。"]],
			clorindeZB: ["female", "fd", 3, ["yexun","shengmingzhiqixZB","canguangjiangzhong"],["des:克洛琳德，不败的枫丹决斗代理人，逐影猎人的传承者，以手中的剑维护着枫丹廷的“公义” 。愚人众执行官“公子”达达利亚渴望切磋过招的对手 。"]],
			arlecchinoZB: ["female", "fd", 3, ["wanxianghuahuiZB","shengmingzhiqixZB","hongsizhiZB","eyuejiangshengZB"],["des:阿蕾奇诺是至冬国外交使团愚人众十一执行官第四席，代号“仆人”。沉静冷酷的外交官，“壁炉之家”所有孩子们畏惧又依赖的“父亲”。世人对愚人众、对这位执行官毁誉参半。但是对家中的大多数孩子来说，“父亲”都是他们人生中最重要的一个人。"]],
        },
        translate:{
            paimengZB:"派蒙",
            navilletteZB:"那维莱特",
			furinaZB:"芙宁娜",
			clorindeZB:"克洛琳德",
			arlecchinoZB:"阿蕾奇诺",
        },
        perfectPair:{
            paimengZB:["yingGZA2"],
            navilletteZB:["none"],
			furinaZB:["none"],
			clorindeZB:["none"],
			arlecchinoZB:["none"],
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
            huobanZB:{
                audio:"ext:真白原神V1:2",
                forced:true,
                trigger:{
                    player:"phaseZhunbeiBegin",
                },
                content:function(){
                    player.draw(2);
                },
                mod:{
                    maxHandcard:function(player,num){
                        return num+2;
                    },
                },
                "_priority":0,
            },
            tanchiZB:{
                audio:"ext:真白原神V1:2",
                trigger:{
                    global:"useCardToTarget",
                },
                forced:true,
                check:function(event,player){
                    return get.effect(player,event.card,event.player,player)>0;
                },
                filter:function(event,player){
                    if(get.name(event.card)!="tao") return false;
                    if(!event.targets) return false;
                    if(!event.targets.contains(player.previous)&&!event.targets.contains(player.next)) return false;
                    if(event.targets.contains(player)) return false;
                    if(get.info(event.card).multitarget) return false;
                    var type=get.type(event.card);
                    if(type!='basic'&&type!='trick') return false;
                    if(lib.filter.targetEnabled2(event.card,event.player,player)){
                        for(var i=0;i<event.targets.length;i++){
                            if(get.distance(event.targets[i],player)<=1) return true;
                        }
                    }
                    return false;
                },
                autodelay:true,
                content:function(){
                    trigger.getParent().targets.add(player);
                    trigger.player.line(player,'green');
                },
                ai:{
                    threaten:2,
                },
                "_priority":0,
            },
            danxiaoZB:{
                audio:"ext:真白原神V1:2",
                forced:true,
                trigger:{
                    player:"damageBegin4",
                },
                filter:function(event,player){
                    return event.num>1;
                },
                content:function(){
                    trigger.num=1;
                },
                "_priority":0,
            },
            liangjiangZB:{
                mod:{
                    maxHandcard:function(player,num){
                        return num;
                    },
                },
                "_priority":0,
            },
			// 那维莱特-重击技能			
			zhongjiZB:{
			audio:"ext:真白原神V1:2",
			forced:true,
			shaRelated:true,
			trigger:{
				player:"useCard",
			},
			filter:function(event,player){
				return event.card.name=='sha';
			},
			content:function(){
				player.loseHp(1);
			},
			group:["zhongjiZB_effect"],
			subSkill:{
				effect:{
					trigger:{
						player:"shaHit",
					},
					forced:true,
					filter:function(event,player){
						return event.card.name=='sha';
					},
					content:function(){
						"step 0"
						player.judge(function(card){
							if(get.color(card) == 'red') return 2;
							return -0.5;
						});
						"step 1"
						if(result.judge > 0){
							player.recover(2);
						} else {
							var list = ['sha'];
							player.gain(game.createCard(list.randomGet()));
							player.$draw();
						}
					},
					sub:true,
				},
			},
			mod:{
				cardUsable:function(card,player,num){
					if(card.name=='sha') return Infinity;
				},
			},
			"_priority":0,
		},
		// 那维莱特-潮水啊我已归来技能
			chaoshuiZB:{
			audio:"ext:真白原神V1:2",
			enable:"phaseUse",
			usable:1,
			filter:function(event,player){
				return game.hasPlayer(function(current){
					return current != player;
				});
			},
			content:function(){
				"step 0"
				var targets = game.filterPlayer(function(current){
					return current != player;
				});
				event.targets = targets;
				event.num = 0;
				player.line(targets, 'green');
				"step 1"
				if(event.num < event.targets.length){
					var target = event.targets[event.num];
					target.judge(function(card){
						if(get.color(card) == 'red') return 2;
						return -0.5;
					}).judge2 = function(result){
						return result.judge > 0;
					};
					event.target = target;
					event.goto(2);
				} else {
					event.finish();
				}
				"step 2"
				if(result.judge > 0){
					var list = ['sha'];
					player.gain(game.createCard(list.randomGet()), 'gain2');
				} else {
					target.chooseToDiscard('he', true);
				}
				event.num++;
				event.goto(1);
			},
			"_priority":0,
		},
		// 芙宁娜气氛值技能
		qifenZhiZB: {
			trigger: {
				player: "changeHp",
			},
			forced: true,
			filter: function(event, player) {
				return player.storage.qifenZhiZB < 3;
			},
			content: function() {
				player.storage.qifenZhiZB = player.storage.qifenZhiZB || 0;
				player.storage.qifenZhiZB++;
				player.gainMaxHp(1);
				player.markSkill('qifenZhiZB', {
					name: '气氛值',
					content: function(storage) {
						return '当前气氛值：' + storage;
					},
					markcount: player.storage.qifenZhiZB
				});
				game.addVideo('storage', player, ['qifenZhiZB', player.storage.qifenZhiZB]);
				player.updateMarks();
			},
			intro: {
				markcount: "气氛",
				content: function(storage) {
					return '当前气氛值：' + storage;
				}
			},
			onremove: function(player) {
				if (player.storage.qifenZhiZB) {
					player.storage.qifenZhiZB = 0;
					player.unmarkSkill('qifenZhiZB');
				}
			}
		},

		// 重置气氛值技能
		qifenZhiZB_reset: {
			trigger: {
				player: "phaseZhunbeiBegin"
			},
			forced: true,
			popup: false,
			filter: function(event, player) {
				return player.storage.qifenZhiZB > 0;
			},
			content: function() {
				if (player.storage.qifenZhiZB) {
					var maxHpDecrease = player.storage.qifenZhiZB;
					player.loseMaxHp(maxHpDecrease);
					player.storage.qifenZhiZB = 0;
					player.unmarkSkill('qifenZhiZB');
				}
			}
		},

		// 万众狂欢技能
		wanzhongkuanghuanZB: {
			audio: "ext:真白原神V1:2",
			enable: "phaseUse",
			usable: 1,
			filter(card, player) {
				return true;
			},
			content() {
				var target = player;

				// 恢复1点体力
				target.recover(1);
				
				// 恢复1点体力
				target.draw(1);

				// 增加1点气氛值
				target.storage.qifenZhiZB = target.storage.qifenZhiZB || 0;
				//for (var i = 0; i < 2; i++) {
					if (target.storage.qifenZhiZB < 3) {
						target.storage.qifenZhiZB++;
						target.gainMaxHp(1);
					}
				//}
				target.markSkill('qifenZhiZB', {
					name: '气氛值',
					content: function(storage) {
						return '当前气氛值：' + storage;
					},
					markcount: target.storage.qifenZhiZB
				});
				game.addVideo('storage', target, ['qifenZhiZB', target.storage.qifenZhiZB]);
				target.updateMarks();
			},
			ai: {
				order: 1,
				result: {
					player: 1
				}
			},
			intro: {
				markcount: "气氛",
				content: function(storage) {
					return '当前气氛值：' + storage;
				}
			},
			onremove: function(player) {
				if (player.storage.qifenZhiZB) {
					player.storage.qifenZhiZB = 0;
					player.unmarkSkill('qifenZhiZB');
				}
			},
			mod: {
			},
			"_priority": 0
		},
	    //气氛值杀额外伤害
			qifenExtraDamage: {
				trigger: {
					player: "shaBegin"
				},
				filter: function(event, player) {
					return player.storage.qifenZhiZB > 0;
				},
				forced: true,
				content: function(trigger) {
					trigger.baseDamage += player.storage.qifenZhiZB;
				}
			},

// 夜巡技能
yexun: {
    audio: "ext:真白原神V1:2",
    enable: "phaseUse",
    usable: 1,
    filter(card, player) {
        return true;
    },
    content() {
        player.addTempSkill('yexun_status', 'phaseEnd');
        player.addTempSkill('juedouDamageZB', 'phaseEnd'); // 添加 juedouDamageZB 技能
        player.markSkill('yexun_status');
        player.storage.yexun_count = 0; // 初始化计数器
    },
    ai: {
        order: 1,
        result: {
            player: 1
        }
    },
    onremove: function(player) {
        player.unmarkSkill('yexun_status');
        delete player.storage.yexun_count;
    },
    "_priority": 0
},

// 夜巡状态技能
yexun_status: {
    trigger: {
        player: "useCardAfter"
    },
    filter: function(event, player) {
        return player.isPhaseUsing() && event.card.name != 'juedou';
    },
    direct: true,
    content: function() {
        "step 0"
        player.storage.yexun_count++;
        if (player.storage.yexun_count >= 2) { // 修改为每使用一张牌
            player.storage.yexun_count = 0; // 重置计数器
            player.chooseTarget('请选择一个距离1以内的目标角色', function(card, player, target) {
                return get.distance(player, target) <= 1 && target != player;
            }).set('ai', function(target) {
                return -get.attitude(player, target);
            });
        } else {
            event.finish();
        }
        "step 1"
        if (result.bool) {
            player.logSkill('yexun', result.targets);
            player.useCard({ name: 'juedou' }, result.targets[0], false);
        }
    },
    mark: true,
    marktext: "巡",
    intro: {
        content: "每使用两张牌，你可以指定附近距离为1的一个其他角色，对其出一张[决斗]。",
    },
    onremove: function(player) {
        player.unmarkSkill('yexun_status');
        delete player.storage.yexun_count;
    }
},

// 决斗造成伤害后增加生命之契层数
juedouDamageZB: {
    trigger: {
        source: "damageEnd",
    },
    filter: function(event, player) {
        return event.card && event.card.name == 'juedou';
    },
    forced: true,
    popup: false,
    content: function() {
        player.storage.shengmingzhiqixZB = player.storage.shengmingzhiqixZB || 0;
        if (player.storage.shengmingzhiqixZB < 3) {
            player.storage.shengmingzhiqixZB++;
            player.markSkill('shengmingzhiqixZB', {
                name: '生命之契',
                content: function(storage) {
                    return '当前生命之契层数：' + storage;
                },
                markcount: player.storage.shengmingzhiqixZB
            });
            game.addVideo('storage', player, ['shengmingzhiqixZB', player.storage.shengmingzhiqixZB]);
            player.updateMarks();
        }
    }
},

//生命之契
shengmingzhiqixZB: {
    trigger: {
        source: "damageBegin" // 保持为 damageBegin 确保在伤害计算时触发
    },
    forced: true,
    filter: function(event, player) {
        return player.storage.shengmingzhiqixZB > 0 && event.card && event.card.name == 'sha';
    },
    content: function() {
        // 增加额外伤害
        trigger.num += player.storage.shengmingzhiqixZB;
        // 重置生命之契层数
        player.storage.shengmingzhiqixZB = 0;
        player.unmarkSkill('shengmingzhiqixZB');
    },
    mark: true,
    marktext: "契",
    intro: {
        markcount: "契",
        content: function(storage) {
            return '当前生命之契层数：' + (storage || 0);
        }
    },
    group: ["shengmingzhiqixZB_noRecover", "shengmingzhiqixZB_gain"],
    subSkill: {
        noRecover: {
            trigger: {
                player: "recoverBegin"
            },
            forced: true,
            filter: function(event, player) {
                return player.storage.shengmingzhiqixZB > 0;
            },
            content: function() {
                trigger.cancel();
            }
        },
        gain: {
            trigger: {
                player: "gainMaxHpAfter"
            },
            forced: true,
            content: function() {
                player.storage.shengmingzhiqixZB = player.storage.shengmingzhiqixZB || 0;
                player.storage.shengmingzhiqixZB++;
                if (player.storage.shengmingzhiqixZB > 3) {
                    player.storage.shengmingzhiqixZB = 3;
                }
                player.markSkill('shengmingzhiqixZB', {
                    name: '生命之契',
                    content: function(storage) {
                        return '当前生命之契层数：' + (storage || 0);
                    },
                    markcount: player.storage.shengmingzhiqixZB
                });
                game.addVideo('storage', player, ['shengmingzhiqixZB', player.storage.shengmingzhiqixZB]);
                player.updateMarks();
            }
        }
    },
    onremove: function(player) {
        if (player.storage.shengmingzhiqixZB) {
            player.storage.shengmingzhiqixZB = 0;
            player.unmarkSkill('shengmingzhiqixZB');
        }
    }
},

// 残光将终
canguangjiangzhong: {
    audio: "ext:真白原神V1:2",
    enable: "phaseUse",
    usable: 1,
    filter(card, player) {
        return true;
    },
    content() {
        var count = player.hp - 1;
        player.storage.shengmingzhiqixZB = player.storage.shengmingzhiqixZB || 0;
        var newCount = Math.min(count, 3);
        player.storage.shengmingzhiqixZB = Math.min(player.storage.shengmingzhiqixZB + newCount, 3);
        player.markSkill('shengmingzhiqixZB', {
            name: '生命之契',
            content: function(storage) {
                return '当前生命之契：' + storage;
            },
            markcount: player.storage.shengmingzhiqixZB
        });
        game.addVideo('storage', player, ['shengmingzhiqixZB', player.storage.shengmingzhiqixZB]);
        player.updateMarks();
    },
    ai: {
        order: 1,
        result: {
            player: 1
        }
    },
    intro: {
        content: "出牌阶段限1次，立刻获得（你当前生命值-1）的生命之契。",
    },
    onremove: function(player) {
        if (player.storage.shengmingzhiqixZB) {
            player.storage.shengmingzhiqixZB = 0;
            player.unmarkSkill('shengmingzhiqixZB');
        }
    }
},

// 血偿勒令状态
xuechanglingZB: {
    mark: true,
    marktext: "血",
    intro: {
        content: "处于[血偿勒令]状态的角色"
    },
    onremove: function(player) {
        player.unmarkSkill('xuechanglingZB');
    },
	ai: {
        // 默认的 ai 属性
    }
},

// 杀和锦囊牌造成伤害后增加生命之契层数
shaDamageZB: {
    trigger: {
        source: "damageEnd",
    },
    filter: function(event, player) {
        return event.card && (event.card.name == 'sha' || get.type(event.card) == 'trick') && event.player.hasSkill('xuechanglingZB');
    },
    forced: true,
    popup: false,
    content: function() {
        player.storage.shengmingzhiqixZB = player.storage.shengmingzhiqixZB || 0;
        if (player.storage.shengmingzhiqixZB < 3) {
            player.storage.shengmingzhiqixZB += 1;
            player.storage.shengmingzhiqixZB = Math.min(player.storage.shengmingzhiqixZB, 3);
            player.markSkill('shengmingzhiqixZB', {
                name: '生命之契',
                content: function(storage) {
                    return '当前生命之契层数：' + storage;
                },
                markcount: player.storage.shengmingzhiqixZB
            });
            game.addVideo('storage', player, ['shengmingzhiqixZB', player.storage.shengmingzhiqixZB]);
            player.updateMarks();
        }
    },
    ai: {}  // 添加空的ai属性
},

// 万相化灰技能
wanxianghuahuiZB: {
    audio: "ext:真白原神V1:2",
    enable: "phaseUse",
    usable: 2,
    filter(card, player) {
        return !player.hasSkill('wanxianghuahuiZB_used');
    },
    content() {
        "step 0"
        // 获取攻击范围内的所有角色
        var targets = game.filterPlayer(function(current) {
            return player.inRange(current) && current != player;
        });

        // 给所有目标添加[血偿勒令]状态
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            target.addTempSkill('xuechanglingZB', 'phaseEnd');
        }

        // 选择1到2名角色对其各出一张杀
        player.chooseTarget('请选择1到2名角色对其各出一张杀', [1, 2], function(card, player, target) {
            return targets.includes(target);
        }).set('ai', function(target) {
            return -get.attitude(player, target);
        });

        "step 1"
        if (result.bool) {
            var targets = result.targets;
            player.logSkill('wanxianghuahuiZB', targets);
            for (var i = 0; i < targets.length; i++) {
                player.useCard({name: 'sha'}, targets[i], false);
            }
        }

        // 添加临时技能到玩家，确保对[血偿勒令]状态的角色造成伤害后增加生命之契
        player.addTempSkill('shaDamageZB', 'phaseEnd');
        player.addTempSkill('wanxianghuahuiZB_used', 'phaseEnd');
    },
    ai: {
        order: 1,
        result: {
            player: 1
        }
    },
    intro: {
        content: "出牌阶段限1次，使你攻击距离范围内的所有其他角色进入[血偿勒令]状态，并可以指定1到2名角色对其各出一张杀。你对处于[血偿勒令]状态的角色使用[杀]或[锦囊牌]造成伤害后，将增加1点生命之契。[血偿勒令]持续到你的回合结束。",
    },
    onremove: function(player) {
        player.removeSkill('wanxianghuahuiZB');
    },
    "_priority": 0
},

wanxianghuahuiZB_used: {
    // 这是一个空的临时技能，只用于限制wanxianghuahuiZB的使用次数
    ai: {}  // 空的ai属性
},

// 红死之宴
hongsizhiZB: {
    trigger: {
        global: "useCardBegin",
    },
    forced: true,
    filter: function(event, player) {
        return event.card && event.card.name == 'sha' && player.storage.shengmingzhiqixZB > 0;
    },
    content: function() {
        trigger.card.nature = 'fire';
    },
    mod: {
        cardnature: function(card, player) {
            if (card.name == 'sha' && player.storage.shengmingzhiqixZB > 0) return 'fire';
        }
    },
	ai: {
        // 添加默认的 ai 属性
    }
},

eyuejiangshengZB: {
    audio: "ext:真白原神V1:2",
    enable: "phaseUse",
    usable: 1,
    filter(card, player) {
        return true;
    },
    content() {
        // 获取所有距离为1且有[血偿勒令]状态的角色
        var targets = game.filterPlayer(function(current) {
            return get.distance(player, current) <= 1 && current != player && current.hasSkill('xuechanglingZB');
        });

        // 对每个目标造成1点伤害并回收[血偿勒令]状态
        for (var i = 0; i < targets.length; i++) {
            var target = targets[i];
            player.line(target, 'fire');
            target.damage('fire');
            target.removeSkill('xuechanglingZB');
        }

        // 根据生命之契层数恢复体力
        var shengmingzhiqiCount = player.storage.shengmingzhiqixZB || 0;
        if (shengmingzhiqiCount > 0) {
            player.recover(shengmingzhiqiCount);
            player.storage.shengmingzhiqixZB = 0;
            player.unmarkSkill('shengmingzhiqixZB');
        }

        // 重置万相化灰的使用次数
        player.removeSkill('wanxianghuahuiZB_used');
    },
    ai: {
        order: 1,
        result: {
            player: 1
        }
    },
    intro: {
        content: "出牌阶段限1次，回收周围距离为1的其他角色的[血偿勒令]状态，并对其造成1点伤害，并消耗你当前生命之契的层数来恢复你的生命值(若为0层就无法恢复生命值)，并重置万相化灰当前回合的使用次数。",
    }
},
        },
        translate:{
            huobanZB:"伙伴",
            "huobanZB_info":"锁定技，准备阶段你摸2张牌，你的手牌上限+2。",
            tanchiZB:"贪吃",
            "tanchiZB_info":"锁定技，与你座次相邻的角色成为【桃】的目标时，你也成为此牌的目标。",
            danxiaoZB:"胆小",
            "danxiaoZB_info":"锁定技，当你受到伤害时，此伤害降低至1点。",
            liangjiangZB:"亮将",
            "liangjiangZB_info":"",
            zhongjiZB:"重击",
            "zhongjiZB_info":"锁定技，每回合使用【杀】的次数无限制，但是每使用一张【杀】，会扣除1点生命值；若命中后进行判定，若结果为黑色，则获得一张【杀】。若为红色，则恢复2点生命值。",
            chaoshuiZB:"潮水归来",
            "chaoshuiZB_info":"出牌阶段限1次，对所有其他存活的角色进行1次判定，若为红色,你获得1张【杀】.若为黑色则随机弃置判定角色的一张牌。",
			qifenZhiZB: "气氛值",
            "qifenZhiZB_info": "锁定技，当你处于万众狂欢的状态时,每次你的生命值降低或者提升会为你增加1点气氛值,每点气氛值会增加1点体力上限,气氛值上限为3。",
            wanzhongkuanghuanZB: "万众狂欢",
            "wanzhongkuanghuanZB_info": "出牌阶段限制1次，凝聚狂欢之意，构筑水沫的舞台,为你恢复1点生命值，抽1张牌，并增加1点气氛值。",
			qifenZhiZB_reset: "独舞",
            "qifenZhiZB_reset_info": "锁定技，你的回合开始时气氛值会重置为0。",
            qifenExtraDamage: "舞台",
            "qifenExtraDamage_info": "锁定技，当前每1点气氛值会为你增加1点[杀]的伤害。",	
			yexun: "夜巡",
            "yexun_info": "出牌阶段限1次,你进入[夜巡]状态。夜巡状态下,每使用两张牌,你都可以指定距离为1的一名其他角色,对其出一张[决斗],决斗命中其他角色后,增加1点生命之契。夜巡状态持续到你的回合结束。",		shengmingzhiqixZB: "生命之契",
            "shengmingzhiqixZB_info": "锁定技,生命之契的层数不为0时,你的生命值无法恢复.你的下一个[杀]的伤害基于你生命之契层数而增加。杀命中角色后,你的生命之契归0。你的生命之契上限为3。",	
			canguangjiangzhong: "残光将终",
            "canguangjiangzhong_info": "出牌阶段限1次，立刻获得（你当前生命值-1）的生命之契。",	
			yexun_status: "狩夜之巡",
            "yexun_status_info": "狩夜之巡状态",
			wanxianghuahuiZB: "万相化灰",
            "wanxianghuahuiZB_info": "出牌阶段限1次，使你攻击范围内的角色进入[血偿勒令]状态，并对他们各出1张杀。你对处于[血偿勒令]状态的角色使用[杀]或[锦囊]牌造成伤害后，增加1点生命之契。[血偿勒令]持续到你的回合结束。",
			hongsizhiZB: "死宴",
            "hongsizhiZB_info": "锁定技，当你生命之契不为0时，你所有的[杀]都为火杀",
			eyuejiangshengZB: "厄月将升",
            "eyuejiangshengZB_info": "出牌阶段限1次,回收所有距离为1的角色的[血偿勒令]，对其造成1点伤害，消耗生命之契恢复n点生命值(n为生命之契层数)，并重置万相化灰冷却。",
			xuechanglingZB: "血偿勒令",
            "xuechanglingZB_info": "血偿勒令状态",
        },
    },
    intro:"真白原神V1主扩展",
    author:"真白",
    diskURL:"",
    forumURL:"",
    version:"1.0",
},files:{"character":["paimengZB.jpg","navilletteZB.jpg","furinaZB.jpg","clorindeZB.jpg","arlecchinoZB.jpg"],"card":[],"skill":[],"audio":[]}}})
