(function () {
  "use strict";

  var modules = {
    5579: function (module, exports, require) {
      var registerPage = require(2541);
      var HomePage = require(5020);
      registerPage("page-home", HomePage.HomePage);
    },
    8897: function (module, exports, require) {
      require.r(exports);
      require.d(exports, {
        InlineSliderItemListAsync: function () {
          return InlineSliderItemListAsync;
        }
      });

      var React = require(5466);
      var PageStore = require(8578);
      var useLayout = require(2546);
      var ItemListAsync = require(8982);
      var LoadingComponent = require(2832);
      var Item = require(3632);
      var SliderComponent = require(8986);

      function mergeObjects(target, ...sources) {
        sources.forEach(source => {
          if (source != null) {
            Object.keys(source).forEach(key => {
              if (source.propertyIsEnumerable(key)) {
                target[key] = source[key];
              }
            });
            if (Object.getOwnPropertySymbols) {
              Object.getOwnPropertySymbols(source).forEach(sym => {
                if (source.propertyIsEnumerable(sym)) {
                  target[sym] = source[sym];
                }
              });
            }
          }
        });
        return target;
      }

      function copyArray(array, length) {
        return array.slice(0, length);
      }

      function InlineSliderItemListAsync(props) {
        var layout = useLayout().visibleSidebar;
        var [items, setItems] = React.useState([]);
        var [itemList, setItemList] = React.useState(null);
        var [sliderVisible, setSliderVisible] = React.useState(false);

        React.useEffect(() => {
          setItemList(new SliderComponent(props.pageItems, props.maxItems, props.firstItemRequestUrl, props.requestUrl));
          PageStore.on("window_resize", handleResize);

          return () => {
            PageStore.removeListener("window_resize", handleResize);
            if (itemList) {
              itemList.cancelAll();
              setItemList(null);
            }
          };
        }, []);

        React.useEffect(() => {
          updateItemList();
        }, [layout]);

        function handleResize() {
          // handle window resize
        }

        function updateItemList() {
          // update item list
        }

        if (!items.length) {
          return React.createElement(LoadingComponent, { className: "items-list-outer" });
        }

        return React.createElement("div", { className: "items-list-outer" },
          React.createElement("div", { className: "items-list-wrap" },
            React.createElement("div", { className: "items-list" },
              items.map((item, index) => {
                return React.createElement(Item, { key: index, ...item });
              })
            )
          )
        );
      }

      InlineSliderItemListAsync.propTypes = mergeObjects({}, ItemListAsync.propTypes);
      InlineSliderItemListAsync.defaultProps = mergeObjects({}, ItemListAsync.defaultProps, {
        pageItems: 12
      });
    },
    8982: function (module, exports, require) {
      require.r(exports);
      require.d(exports, {
        ItemListAsync: function () {
          return ItemListAsync;
        }
      });

      var React = require(5466);
      var PropTypes = require(3074).default;
      var useItemListSync = require(2546);
      var Item = require(3632);
      var SliderComponent = require(8986);

      function mergeObjects(target, ...sources) {
        sources.forEach(source => {
          if (source != null) {
            Object.keys(source).forEach(key => {
              if (source.propertyIsEnumerable(key)) {
                target[key] = source[key];
              }
            });
            if (Object.getOwnPropertySymbols) {
              Object.getOwnPropertySymbols(source).forEach(sym => {
                if (source.propertyIsEnumerable(sym)) {
                  target[sym] = source[sym];
                }
              });
            }
          }
        });
        return target;
      }

      function copyArray(array, length) {
        return array.slice(0, length);
      }

      function ItemListAsync(props) {
        var [items, setItems] = React.useState([]);
        var [itemList, setItemList] = React.useState(null);

        React.useEffect(() => {
          setItemList(new SliderComponent(props.pageItems, props.maxItems, props.firstItemRequestUrl, props.requestUrl));

          return () => {
            if (itemList) {
              itemList.cancelAll();
              setItemList(null);
            }
          };
        }, []);

        if (!items.length) {
          return React.createElement("div", { className: "items-list-outer" });
        }

        return React.createElement("div", { className: "items-list-outer" },
          React.createElement("div", { className: "items-list-wrap" },
            React.createElement("div", { className: "items-list" },
              items.map((item, index) => {
                return React.createElement(Item, { key: index, ...item });
              })
            )
          )
        );
      }

      ItemListAsync.propTypes = mergeObjects({}, PropTypes);
      ItemListAsync.defaultProps = mergeObjects({}, PropTypes, {
        requestUrl: null,
        firstItemRequestUrl: null,
        pageItems: 24
      });
    },
    90: function (module, exports, require) {
      var React = require(5466).default;
      require(3804);

      exports.MediaMultiListWrapper = function (props) {
        var className = props.className;
        var style = props.style;
        var children = props.children;
        return React.createElement("div", {
          className: (className ? className + " " : "") + "media-list-wrapper",
          style: style
        }, children || null);
      };
    },
    5020: function (module, exports, require) {
      var React = require(5466);
      var LinksConsumer = require(3613).LinksConsumer;
      var PageStore = require(8578);
      var ApiUrlConsumer = require(7180).ApiUrlConsumer;
      var MediaMultiListWrapper = require(90).MediaMultiListWrapper;
      var ItemListAsync = require(8982).ItemListAsync;
      var InlineSliderItemListAsync = require(8897).InlineSliderItemListAsync;
      var Page = require(7637).Page;

      function HomePage(props) {
        var id = props.id || "home";
        var featuredTitle = props.featured_title || PageStore.get("config-options").pages.home.sections.featured.title;
        var recommendedTitle = props.recommended_title || PageStore.get("config-options").pages.home.sections.recommended.title;
        var latestTitle = props.latest_title || PageStore.get("config-options").pages.home.sections.latest.title;
        var latestViewAllLink = props.latest_view_all_link || false;
        var featuredViewAllLink = props.featured_view_all_link || true;
        var recommendedViewAllLink = props.recommended_view_all_link || true;

        var [isFeaturedVisible, setFeaturedVisible] = React.useState(false);
        var [isRecommendedVisible, setRecommendedVisible] = React.useState(false);
        var [isLatestVisible, setLatestVisible] = React.useState(false);

        function handleFeaturedVisibility(count) {
          setFeaturedVisible(count > 0);
        }

        function handleRecommendedVisibility(count) {
          setRecommendedVisible(count > 0);
        }

        function handleLatestVisibility(count) {
          setLatestVisible(count > 0);
        }

        return React.createElement(Page, { id: id },
          React.createElement(LinksConsumer, null, links => 
            React.createElement(ApiUrlConsumer, null, apiUrl => 
              React.createElement(MediaMultiListWrapper, { className: "items-list-ver" },
                PageStore.get("config-enabled").pages.featured.enabled && 
                React.createElement(ItemListRow, { title: featuredTitle, style: isFeaturedVisible ? {} : { display: "none" }, viewAllLink: featuredViewAllLink ? links.featured : null },
                  React.createElement(InlineSliderItemListAsync, { requestUrl: apiUrl.featured, itemsCountCallback: handleFeaturedVisibility })
                ),
                PageStore.get("config-enabled").pages.recommended.enabled && 
                React.createElement(ItemListRow, { title: recommendedTitle, style: isRecommendedVisible ? {} : { display: "none" }, viewAllLink: recommendedViewAllLink ? links.recommended : null },
                  React.createElement(InlineSliderItemListAsync, { requestUrl: apiUrl.recommended, itemsCountCallback: handleRecommendedVisibility })
                ),
                React.createElement(ItemListRow, { title: latestTitle, style: isLatestVisible ? {} : { display: "none" }, viewAllLink: latestViewAllLink ? links.latest : null },
                  React.createElement(ItemListAsync, { pageItems: 30, requestUrl: apiUrl.media, itemsCountCallback: handleLatestVisibility })
                ),
                isLatestVisible && React.createElement(EmptyMediaMessage, null)
              )
            )
          )
        );
      }

      function EmptyMediaMessage() {
        return React.createElement(LinksConsumer, null, links => 
          React.createElement("div", { className: "empty-media" },
            React.createElement("div", { className: "welcome-title" }, "Welcome to CoBuddies!"),
            React.createElement("div", { className: "start-uploading" }, "Start uploading media and sharing your work!"),
            React.createElement("a", { href: links.user.addMedia, title: "Upload media", className: "button-link" },
              React.createElement("i", { className: "material-icons", "data-icon": "video_call" }, "UPLOAD MEDIA")
            )
          )
        );
      }

      exports.HomePage = HomePage;
    }
  };

  function require(moduleId) {
    var module = modules[moduleId];
    if (!module) {
      throw new Error("Module not found: " + moduleId);
    }
    return module.exports;
  }

  var webpackChunks = [];

  function webpackJsonpCallback(parentChunkLoadingFunction, data) {
    var chunkIds = data[0];
    var moreModules = data[1];
    var executeModules = data[2];

    for (var moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }

    if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);

    while (chunkIds.length) {
      var chunkId = chunkIds.shift();
      if (installedChunks[chunkId]) {
        installedChunks[chunkId][0]();
      }
      installedChunks[chunkId] = 0;
    }

    while (executeModules.length) {
      executeModules.shift()();
    }
  }

  var installedChunks = { 826: 0 };

  function chunkLoadingGlobalCallback(data) {
    webpackJsonpCallback(0, data);
  }

  var chunkLoadingGlobal = self.webpackChunkmediacms_frontend = self.webpackChunkmediacms_frontend || [];
  chunkLoadingGlobal.forEach(chunkLoadingGlobalCallback.bind(null, 0));
  chunkLoadingGlobal.push = chunkLoadingGlobalCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));

  require(5579);
})();
