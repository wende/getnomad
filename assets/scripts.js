window.textToHtml = function(e) {
    var i = String(e).replace(/<\!DOCTYPE[^>]*>/i, "").replace(/<(html|head|body|title|meta|script)([\s\>])/gi, '<div class="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi, "</div>");
    return i
}, $(function() {
    setTimeout(function() {
        $("body").addClass("loading")
    }, 200), setTimeout(function() {
        $("body").addClass("loaded")
    }, 2200), setTimeout(function() {
        $("body").addClass("initialized")
    }, 3600)
}), $(function() {
    var e = Backbone.Model.extend({
            attributes: {
                html: ""
            },
            fetch: function(e) {
                var i = this;
                this.unset("html", {
                    silent: !0
                }), $.ajax({
                    url: e.url,
                    success: function(e) {
                        var t = $(textToHtml(e));
                        i.set({
                            html: $(".project-detail", t).html()
                        })
                    }
                })
            }
        }),
        i = (Backbone.Collection.extend({}), Backbone.View.extend({
            initialize: function() {
                $(window).on("resize", this.onWindowResize.bind(this)), this.onWindowResize(null)
            },
            onWindowResize: function(e) {
                this.$el.height($(window).height() / 2)
            }
        })),
        t = Backbone.View.extend({
            $logo: null,
            initialize: function() {
                this.$logo = $(".logo", this.$el), setTimeout(function() {
                    this.$logo.addClass("is-animated")
                }.bind(this), 2000)
            }
        }),
        o = Backbone.View.extend({
            $gem: null,
            $gems: null,
            $headline: null,
            initialize: function() {
                this.$gem = $(".gem-image", this.$el)
                this.$gems = $(".gems", this.$el)
                this.$headline = $(".section-headline", this.$el)
                $(window).on("scroll", this.onWindowScroll.bind(this))
                setTimeout(this.initWaypoints.bind(this), 4e3)
                this.$gem.css({
                    top: 0
                })
            },
            render: function() {
                this.$gem.css({
                    top: 0
                })
            },
            initWaypoints: function() {
                this.$gems.waypoint(function(e) {
                    $(".gem", this.element).each(function(e) {
                        var i = $(this);
                        setTimeout(function() {
                            i.addClass("animate")
                        }, 500 * e)
                    })
                }, {
                    offset: "70%"
                })
            },
            onWindowScroll: function(e) {
                console.log("SCROLL")
                var i = $(window).scrollTop() / this.$el.offset().top;
                this.$gem.css({
                    top: -$(window).height() * i * .2
                })
            }
        }),
        s = Backbone.View.extend({
            projectCloseButtonTemplate: '<a href="" class="project-close-button--fixed"><div class="close-icon"></div></a>',
            $projectNav: null,
            $projectDetail: null,
            $projectLoader: null,
            $projectCloseButton: null,
            isLaunched: !1,
            initialize: function() {
                this.$projectNav = $(".project-nav", this.$el), this.$projectDetail = $(".project-detail", this.$el), this.$projectLoader = $(".project-loader", this.$el), this.$projectCloseButton = $(this.projectCloseButtonTemplate).clone(), $("body").append(this.$projectCloseButton), this.initListeners()
            },
            initListeners: function() {
                this.listenTo(this.model, "change", this.onProjectLoaded), $(".project-link", this.$projectNav).on("click", this.onProjectLinkClicked.bind(this)), this.$projectLoader.on("click", this.onProjectCloseClicked.bind(this)), this.$projectCloseButton.on("click", this.onProjectCloseClicked.bind(this)), $(window).on("scroll", this.onWindowScroll.bind(this))
            },
            loadProject: function(e) {
                this.$el.addClass("is-loading");
                var i = this;
                setTimeout(function() {
                    i.model.fetch({
                        url: e
                    })
                }, 800)
            },
            launchProject: function() {
                this.$el.css("min-height", $(window).height() + $(window).scrollTop() - this.$el.offset().top), this.$el.addClass("do-launch"), setTimeout(this.onProjectLaunched.bind(this), 1e3)
            },
            closeProject: function() {
                $(".is-selected", this.$projectNav).removeClass("is-selected"), this.$el.css("min-height", 0), this.$el.addClass("do-close"), this.$el.removeClass("is-launched"), setTimeout(this.onProjectClosed.bind(this), 1e3), this.isLaunched = !1
            },
            onProjectLinkClicked: function(e) {
                return $(e.currentTarget).closest("li").addClass("is-selected"), this.loadProject($(e.currentTarget).attr("href")), !1
            },
            onProjectCloseClicked: function(e) {
                var i = 0;
                return $(window).scrollTop() > this.$el.offset().top + .6 * $(window).height() && ($("body,html").animate({
                    scrollTop: this.$el.offset().top
                }, 900, "easeInOutQuart"), i = 1e3), setTimeout(this.closeProject.bind(this), i), this.isLaunched = !1, !1
            },
            onProjectLoaded: function() {
                this.$el.addClass("is-loaded"), this.$projectDetail.html(this.model.get("html")), $(".js-flickityGallery", this.$projectDetail).each(function() {
                    new r({
                        el: $(this)
                    })
                }), setTimeout(this.launchProject.bind(this), 1e3)
            },
            onWindowScroll: function(e) {
                $(window).scrollTop() > this.$el.offset().top && this.$projectLoader.addClass(".is-fixed")
            },
            onProjectLaunched: function() {
                this.$el.addClass("is-launched"), this.$el.removeClass("do-launch"), this.$el.removeClass("is-loading"), this.isLaunched = !0
            },
            onProjectClosed: function() {
                this.$el.removeClass("is-loaded"), this.$el.removeClass("do-close"), this.$projectDetail.html("")
            },
            onWindowScroll: function(e) {
                this.isLaunched && $(window).scrollTop() > this.$el.offset().top + .6 * $(window).height() && $(window).scrollTop() < this.$el.offset().top + this.$el.outerHeight() - .6 * $(window).height() ? this.$projectCloseButton.addClass("is-shown") : this.$projectCloseButton.removeClass("is-shown")
            }
        }),
        n = Backbone.View.extend({
            $readMoreTrigger: null,
            initialize: function() {
                this.$readMoreTrigger = $(".js-read-more", this.$el), this.$readMoreTrigger.bind("click", this.onReadMoreClicked.bind(this))
            },
            onReadMoreClicked: function(e) {
                var i = $(e.currentTarget).closest(".row").prevAll(".row:hidden");
                return i.last().fadeIn(), 1 == i.length && this.$readMoreTrigger.fadeOut(), !1
            }
        }),
        l = Backbone.View.extend({
            $headline: null,
            $content: null,
            initialize: function() {
                this.$headline = $(".section__headline", this.$el), this.$content = $(".section__content", this.$el), this.$headline.waypoint(function(e) {
                    $(this.element).addClass("is-animated")
                }, {
                    offset: "70%"
                })
            }
        }),
        c = Backbone.View.extend({
            $trigger: null,
            $menuItems: null,
            scrollTop: $(window).scrollTop(),
            scrollDirection: 1,
            top: 0,
            scrollResetTimeout: void 0,
            currentSection: "",
            initialize: function() {
                this.$trigger = $(".main-nav-trigger", this.$el), this.$menuItems = $($('ul li a[href^="#"]', this.$el).get().reverse()), $(window).on("scroll", this.onWindowScroll.bind(this)), this.$menuItems.on("click", this.onMenuItemClicked.bind(this)), this.$trigger.on("click", this.onTriggerClicked.bind(this)), this.onWindowScroll()
            },
            resetScroll: function(e) {
                this.scrollTop = $(window).scrollTop()
            },
            onMenuItemClicked: function(e) {
                var i = $(e.target).attr("href");
                return this.$trigger.removeClass("is-closeable"), $("html,body").animate({
                    scrollTop: $(i).offset().top - 80
                }, 1e3, "easeInOutQuart"), this.$el.removeClass("is-visible"), $("body").removeClass("is-offcanvas"), !1
            },
            onTriggerClicked: function(e) {
                return "s" == Breakpoints.getBreakpoint() && (this.$trigger.toggleClass("is-closeable"), this.$el.toggleClass("is-visible"), $("body").toggleClass("is-offcanvas")), !1
            },
            onWindowScroll: function(e) {
                var i = this,
                    t = Math.max(0, $(window).scrollTop()),
                    o = this.scrollTop - t;
                o > 40 ? this.$trigger.addClass("is-visible") : -40 > o && this.$trigger.removeClass("is-visible"), this.$menuItems.each(function() {
                    var e = $(this).attr("href");
                    if ($(e).offset().top <= t + $(window).height()) {
                        var o = $(this).attr("href").replace("#", "");
                        return i.$menuItems.removeClass("is-active"), $(this).addClass("is-active"), i.currentSection != o && (i.currentSection = o, $(window).trigger("section-changed", [o])), !1
                    }
                }), t == $(document).height() - $(window).height() && this.$trigger.addClass("is-visible"), 0 == t && this.$trigger.addClass("is-visible"), this.scrollResetTimeout = setTimeout(this.resetScroll.bind(this), 150)
            }
        }),
        r = Backbone.View.extend({
            flkty: null,
            initialize: function() {
                this.$el.flickity({
                    cellAlign: "left",
                    contain: !0,
                    imagesLoaded: !0,
                    wrapAround: !0
                }), this.flkty = this.$el.data("flickity");
                var e = this;
                this.$el.closest(".showcase-browser").length && this.$el.on("cellSelect", function() {
                    e.$el.closest(".showcase-composition").find(".showcase-phone .js-flickityGallery").flickity("select", e.flkty.selectedIndex)
                })
            }
        }),
        a = Backbone.View.extend({
            initialize: function() {
                this.$el.on("click", this.onOverlayTriggerClicked.bind(this))
            },
            onOverlayTriggerClicked: function(e) {
                return e.preventDefault(), $(e.currentTarget).toggleClass("is-triggered"), $($(e.currentTarget).attr("href")).toggleClass("is-visible"), !1
            },
            onCloseableClicked: function(e) {
                return e.preventDefault(), $(e.currentTarget).removeClass("is-closeable").off("click", this.onCloseableClicked), $(".overlay.is-visible").removeClass("is-visible"), $(".js-overlay.is-triggered").removeClass("is-triggered"), !1
            }
        });
    Breakpoints = jRespond([{
        label: "s",
        enter: 0,
        exit: 767
    }, {
        label: "m",
        enter: 768,
        exit: 991
    }, {
        label: "l",
        enter: 992,
        exit: 1199
    }, {
        label: "xl",
        enter: 1200,
        exit: 1e4
    }]), App = function() {
        var h, d, u, f = function() {
                g(), w()
            },
            g = function() {
                $(window).on("section-changed", m)
            },
            w = function() {
                $(".section").each(function() {
                    new l({
                        el: $(this)
                    })
                }), $(".js-flickityGallery").each(function() {
                    new r({
                        el: $(this)
                    })
                }), u = new e, mainNavView = new c({
                    el: ".main-nav"
                }), h = new t({
                    el: ".section-intro"
                }), letterSectionView = new n({
                    el: ".section-letters"
                }), heroSectionView = new i({
                    el: $(".section-heros")
                }), d = new o({
                    el: $(".section-gems")
                }), workSectionView = new s({
                    el: $(".section-work"),
                    model: u
                }), $(".js-overlay").each(function() {
                    new a({
                        el: $(this)
                    })
                })
            },
            m = function(e, i) {
                ga("send", "pageview", "/" + i)
            };
        f()
    }()
});