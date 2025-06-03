import AppIntents

struct ConfigurationAppIntent: WidgetConfigurationIntent {
    static var title: LocalizedStringResource { "Widget Text Config" }
    static var description: IntentDescription {
        IntentDescription("Show saved text from app")
    }

    @Parameter(title: "Saved Text")
    var displayText: String?

    static func defaultValue(for _: String?) -> String? {
        let defaults = UserDefaults(suiteName: "group.de.kisimedia.WidgetBridgePluginExample")
        return defaults?.string(forKey: "widgetText") ?? "No text saved"
    }

    func defaultValue(for parameter: Parameter<String?>) -> String? {
        ConfigurationAppIntent.defaultValue(for: displayText)
    }

    static var previewIntent: ConfigurationAppIntent {
        let intent = ConfigurationAppIntent()
        intent.displayText = "Preview text"
        return intent
    }
}
