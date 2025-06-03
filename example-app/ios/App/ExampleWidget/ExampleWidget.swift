import AppIntents
import SwiftUI
import WidgetKit

struct SimpleEntry: TimelineEntry {
    let date: Date
    let text: String
    let configuration: ConfigurationAppIntent
}

struct Provider: AppIntentTimelineProvider {
    typealias Intent = ConfigurationAppIntent

    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), text: "Loading...", configuration: .previewIntent)
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async
        -> SimpleEntry
    {
        let text = loadWidgetText()
        return SimpleEntry(date: Date(), text: text, configuration: configuration)
    }

    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<
        SimpleEntry
    > {
        let text = loadWidgetText()
        let entry = SimpleEntry(date: Date(), text: text, configuration: configuration)
        return Timeline(entries: [entry], policy: .atEnd)
    }

    private func loadWidgetText() -> String {
        let defaults = UserDefaults(suiteName: "group.de.kisimedia.WidgetBridgePluginExample")
        return defaults?.string(forKey: "widgetText") ?? "No text"
    }
}

struct ExampleWidgetEntryView: View {
    var entry: SimpleEntry

    var body: some View {
        VStack {
            Text("Your text:")
                .font(.caption)
                .foregroundStyle(.secondary)
            Text(entry.text)
                .font(.headline)
                .multilineTextAlignment(.center)
        }
        .padding()
    }
}

struct ExampleWidget: Widget {
    let kind: String = "ExampleWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: kind, intent: ConfigurationAppIntent.self, provider: Provider()
        ) { entry in
            ExampleWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Text-Widget")
        .description("Show text from capacitor app")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

#Preview(as: .systemSmall) {
    ExampleWidget()
} timeline: {
    SimpleEntry(date: .now, text: "Example", configuration: .previewIntent)
}
