import {
  require_react
} from "./chunk-32AJJKBB.js";
import {
  __toESM
} from "./chunk-HYZYPRER.js";

// node_modules/@google-pay/button-react/dist/index.js
var import_react = __toESM(require_react());
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var cachedScripts = {};
function loadScript(src) {
  const existing = cachedScripts[src];
  if (existing) {
    return existing;
  }
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    const onScriptLoad = () => {
      resolve();
    };
    const onScriptError = () => {
      cleanup();
      delete cachedScripts[src];
      script.remove();
      reject(new Error(`Unable to load script ${src}`));
    };
    script.addEventListener("load", onScriptLoad);
    script.addEventListener("error", onScriptError);
    document.body.appendChild(script);
    function cleanup() {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("error", onScriptError);
    }
  });
  cachedScripts[src] = promise;
  return promise;
}
var ButtonManager = class {
  constructor(options) {
    this.handleClick = (event) => __awaiter(this, void 0, void 0, function* () {
      const config = this.config;
      if (!config) {
        throw new Error("google-pay-button: Missing configuration");
      }
      const request = this.createLoadPaymentDataRequest(config);
      try {
        if (config.onClick) {
          config.onClick(event);
        }
        if (event.defaultPrevented) {
          return;
        }
        const result = yield this.client.loadPaymentData(request);
        if (config.onLoadPaymentData) {
          config.onLoadPaymentData(result);
        }
      } catch (err) {
        if (err.statusCode === "CANCELED") {
          if (config.onCancel) {
            config.onCancel(err);
          }
        } else if (config.onError) {
          config.onError(err);
        } else {
          console.error(err);
        }
      }
    });
    this.options = options;
  }
  getElement() {
    return this.element;
  }
  isGooglePayLoaded() {
    var _a, _b;
    return "google" in (window || global) && !!((_b = (_a = google === null || google === void 0 ? void 0 : google.payments) === null || _a === void 0 ? void 0 : _a.api) === null || _b === void 0 ? void 0 : _b.PaymentsClient);
  }
  mount(element) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isGooglePayLoaded()) {
        try {
          yield loadScript("https://pay.google.com/gp/p/js/pay.js");
        } catch (err) {
          if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.onError) {
            this.config.onError(err);
          } else {
            console.error(err);
          }
          return;
        }
      }
      this.element = element;
      if (element) {
        this.appendStyles();
        if (this.config) {
          this.updateElement();
        }
      }
    });
  }
  unmount() {
    this.element = void 0;
  }
  configure(newConfig) {
    let promise = void 0;
    this.config = newConfig;
    if (!this.oldInvalidationValues || this.isClientInvalidated(newConfig)) {
      promise = this.updateElement();
    }
    this.oldInvalidationValues = this.getInvalidationValues(newConfig);
    return promise !== null && promise !== void 0 ? promise : Promise.resolve();
  }
  /**
   * Creates client configuration options based on button configuration
   * options.
   *
   * This method would normally be private but has been made public for
   * testing purposes.
   *
   * @private
   */
  createClientOptions(config) {
    const clientConfig = {
      environment: config.environment,
      merchantInfo: this.createMerchantInfo(config)
    };
    if (config.onPaymentDataChanged || config.onPaymentAuthorized) {
      clientConfig.paymentDataCallbacks = {};
      if (config.onPaymentDataChanged) {
        clientConfig.paymentDataCallbacks.onPaymentDataChanged = (paymentData) => {
          const result = config.onPaymentDataChanged(paymentData);
          return result || {};
        };
      }
      if (config.onPaymentAuthorized) {
        clientConfig.paymentDataCallbacks.onPaymentAuthorized = (paymentData) => {
          const result = config.onPaymentAuthorized(paymentData);
          return result || {};
        };
      }
    }
    return clientConfig;
  }
  createIsReadyToPayRequest(config) {
    const paymentRequest = config.paymentRequest;
    const request = {
      apiVersion: paymentRequest.apiVersion,
      apiVersionMinor: paymentRequest.apiVersionMinor,
      allowedPaymentMethods: paymentRequest.allowedPaymentMethods,
      existingPaymentMethodRequired: config.existingPaymentMethodRequired
    };
    return request;
  }
  /**
   * Constructs `loadPaymentData` request object based on button configuration.
   *
   * It infers request properties like `shippingAddressRequired`,
   * `shippingOptionRequired`, and `billingAddressRequired` if not already set
   * based on the presence of their associated options and parameters. It also
   * infers `callbackIntents` based on the callback methods defined in button
   * configuration.
   *
   * This method would normally be private but has been made public for
   * testing purposes.
   *
   * @private
   */
  createLoadPaymentDataRequest(config) {
    const request = Object.assign(Object.assign({}, config.paymentRequest), { merchantInfo: this.createMerchantInfo(config) });
    return request;
  }
  createMerchantInfo(config) {
    const merchantInfo = Object.assign({}, config.paymentRequest.merchantInfo);
    if (!merchantInfo.softwareInfo) {
      merchantInfo.softwareInfo = {
        id: this.options.softwareInfoId,
        version: this.options.softwareInfoVersion
      };
    }
    return merchantInfo;
  }
  isMounted() {
    return this.element != null && this.element.isConnected !== false;
  }
  removeButton() {
    if (this.element instanceof ShadowRoot || this.element instanceof Element) {
      for (const child of Array.from(this.element.children)) {
        if (child.tagName !== "STYLE") {
          child.remove();
        }
      }
    }
  }
  updateElement() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.isMounted())
        return;
      const element = this.getElement();
      if (!this.config) {
        throw new Error("google-pay-button: Missing configuration");
      }
      this.removeButton();
      try {
        this.client = new google.payments.api.PaymentsClient(this.createClientOptions(this.config));
      } catch (err) {
        if (this.config.onError) {
          this.config.onError(err);
        } else {
          console.error(err);
        }
        return;
      }
      const buttonOptions = {
        buttonType: this.config.buttonType,
        buttonColor: this.config.buttonColor,
        buttonSizeMode: this.config.buttonSizeMode,
        buttonLocale: this.config.buttonLocale,
        onClick: this.handleClick,
        allowedPaymentMethods: this.config.paymentRequest.allowedPaymentMethods
      };
      const rootNode = element.getRootNode();
      if (rootNode instanceof ShadowRoot) {
        buttonOptions.buttonRootNode = rootNode;
      }
      const button = this.client.createButton(buttonOptions);
      this.setClassName(element, [element.className, "not-ready"]);
      element.appendChild(button);
      let showButton = false;
      let readyToPay;
      try {
        readyToPay = yield this.client.isReadyToPay(this.createIsReadyToPayRequest(this.config));
        showButton = readyToPay.result && !this.config.existingPaymentMethodRequired || readyToPay.result && readyToPay.paymentMethodPresent && this.config.existingPaymentMethodRequired || false;
      } catch (err) {
        if (this.config.onError) {
          this.config.onError(err);
        } else {
          console.error(err);
        }
      }
      if (!this.isMounted())
        return;
      if (showButton) {
        try {
          this.client.prefetchPaymentData(this.createLoadPaymentDataRequest(this.config));
        } catch (err) {
          console.log("Error with prefetch", err);
        }
        this.setClassName(element, (element.className || "").split(" ").filter((className) => className && className !== "not-ready"));
      }
      if (this.isReadyToPay !== (readyToPay === null || readyToPay === void 0 ? void 0 : readyToPay.result) || this.paymentMethodPresent !== (readyToPay === null || readyToPay === void 0 ? void 0 : readyToPay.paymentMethodPresent)) {
        this.isReadyToPay = !!(readyToPay === null || readyToPay === void 0 ? void 0 : readyToPay.result);
        this.paymentMethodPresent = readyToPay === null || readyToPay === void 0 ? void 0 : readyToPay.paymentMethodPresent;
        if (this.config.onReadyToPayChange) {
          const readyToPayResponse = {
            isButtonVisible: showButton,
            isReadyToPay: this.isReadyToPay
          };
          if (this.paymentMethodPresent) {
            readyToPayResponse.paymentMethodPresent = this.paymentMethodPresent;
          }
          this.config.onReadyToPayChange(readyToPayResponse);
        }
      }
    });
  }
  setClassName(element, classNames) {
    const className = classNames.filter((name2) => name2).join(" ");
    if (className) {
      element.className = className;
    } else {
      element.removeAttribute("class");
    }
  }
  appendStyles() {
    var _a, _b, _c;
    if (typeof document === "undefined")
      return;
    const rootNode = (_a = this.element) === null || _a === void 0 ? void 0 : _a.getRootNode();
    const styleId = `default-google-style-${this.options.cssSelector.replace(/[^\w-]+/g, "")}-${(_b = this.config) === null || _b === void 0 ? void 0 : _b.buttonLocale}`;
    if (rootNode) {
      if (!((_c = rootNode.getElementById) === null || _c === void 0 ? void 0 : _c.call(rootNode, styleId))) {
        const style = document.createElement("style");
        style.id = styleId;
        style.type = "text/css";
        style.innerHTML = `
          ${this.options.cssSelector} {
            display: inline-block;
          }
          ${this.options.cssSelector}.not-ready {
            width: 0;
            height: 0;
            overflow: hidden;
          }
        `;
        if (rootNode instanceof Document && rootNode.head) {
          rootNode.head.appendChild(style);
        } else {
          rootNode.appendChild(style);
        }
      }
    }
  }
  isClientInvalidated(newConfig) {
    if (!this.oldInvalidationValues)
      return true;
    const newValues = this.getInvalidationValues(newConfig);
    return newValues.some((value, index) => value !== this.oldInvalidationValues[index]);
  }
  getInvalidationValues(config) {
    var _a, _b;
    return [
      config.environment,
      config.existingPaymentMethodRequired,
      !!config.onPaymentDataChanged,
      !!config.onPaymentAuthorized,
      config.buttonColor,
      config.buttonType,
      config.buttonLocale,
      config.buttonSizeMode,
      config.paymentRequest.merchantInfo.merchantId,
      config.paymentRequest.merchantInfo.merchantName,
      (_a = config.paymentRequest.merchantInfo.softwareInfo) === null || _a === void 0 ? void 0 : _a.id,
      (_b = config.paymentRequest.merchantInfo.softwareInfo) === null || _b === void 0 ? void 0 : _b.version,
      config.paymentRequest.allowedPaymentMethods
    ];
  }
};
var name = "@google-pay/button-react";
var version = "3.0.9";
var CLASS = "google-pay-button-container";
var GooglePayButton = class extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.manager = new ButtonManager({
      cssSelector: `.${CLASS}`,
      softwareInfoId: name,
      softwareInfoVersion: version
    });
    this.elementRef = import_react.default.createRef();
  }
  componentDidMount() {
    return __awaiter(this, void 0, void 0, function* () {
      const element = this.elementRef.current;
      if (element) {
        yield this.manager.configure(this.props);
        yield this.manager.mount(element);
      }
    });
  }
  componentWillUnmount() {
    this.manager.unmount();
  }
  componentDidUpdate() {
    this.manager.configure(this.props);
  }
  render() {
    return import_react.default.createElement("div", { ref: this.elementRef, className: [CLASS, this.props.className].filter((c) => c).join(" "), style: this.props.style });
  }
};
export {
  GooglePayButton as default
};
/*! Bundled license information:

@google-pay/button-react/dist/index.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
//# sourceMappingURL=@google-pay_button-react.js.map
