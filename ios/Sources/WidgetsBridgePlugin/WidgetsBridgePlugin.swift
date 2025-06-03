import Capacitor
import Foundation
import WidgetKit

@objc(WidgetsBridgePlugin)
public class WidgetsBridgePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "WidgetsBridgePlugin"
    public let jsName = "WidgetsBridgePlugin"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getItem", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setItem", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeItem", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "reloadAllTimelines", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "reloadTimelines", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getCurrentConfigurations", returnType: CAPPluginReturnPromise),
    ]

    @objc func getItem(_ call: CAPPluginCall) {
        guard let key = call.getString("key"),
            let group = call.getString("group")
        else {
            call.reject("Missing key or group")
            return
        }

        if let defaults = UserDefaults(suiteName: group),
            let value = defaults.string(forKey: key)
        {
            call.resolve(["results": value])
        } else {
            call.resolve(["results": NSNull()])
        }
    }

    @objc func setItem(_ call: CAPPluginCall) {
        guard let key = call.getString("key"),
            let group = call.getString("group"),
            let value = call.getString("value")
        else {
            call.reject("Missing key, group, or value")
            return
        }

        if let defaults = UserDefaults(suiteName: group) {
            defaults.set(value, forKey: key)
            defaults.synchronize()
            call.resolve(["results": true])
        } else {
            call.resolve(["results": false])
        }
    }

    @objc func removeItem(_ call: CAPPluginCall) {
        guard let key = call.getString("key"),
            let group = call.getString("group")
        else {
            call.reject("Missing key or group")
            return
        }

        if let defaults = UserDefaults(suiteName: group) {
            defaults.removeObject(forKey: key)
            defaults.synchronize()
            call.resolve(["results": true])
        } else {
            call.resolve(["results": false])
        }
    }

    @objc func reloadAllTimelines(_ call: CAPPluginCall) {
        WidgetCenter.shared.reloadAllTimelines()
        call.resolve(["results": true])
    }

    @objc func reloadTimelines(_ call: CAPPluginCall) {
        guard let kind = call.getString("ofKind") else {
            call.reject("Missing ofKind")
            return
        }

        WidgetCenter.shared.reloadTimelines(ofKind: kind)
        call.resolve(["results": true])
    }

    @objc func getCurrentConfigurations(_ call: CAPPluginCall) {
        if #available(iOS 14.0, *) {
            WidgetCenter.shared.getCurrentConfigurations { result in
                guard case .success(let widgets) = result else {
                    call.reject("Could not get current configurations")
                    return
                }

                call.resolve([
                    "results": widgets.map { widget in
                        [
                            "family": widget.family.description,
                            "kind": widget.kind,
                            "configuration": [
                                "description": widget.configuration?.description
                            ],
                        ]
                    }
                ])
            }
        } else {
            call.unavailable("Not available in iOS 13 or earlier.")
        }
    }
}
