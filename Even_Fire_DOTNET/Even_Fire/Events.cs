
using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

public partial class Events
{
    [JsonProperty("id")]
    public Guid Id { get; set; }

    [JsonProperty("aggregate_id")]
    public Guid AggregateId { get; set; }

    [JsonProperty("type")]
    public string Type { get; set; }

    [JsonProperty("timestamp")]
    public string Timestamp { get; set; }

    [JsonProperty("data")]
    public Data Data { get; set; }
}

public partial class Data
{
    [JsonProperty("name", NullValueHandling = NullValueHandling.Ignore)]
    public string Name { get; set; }

    [JsonProperty("birthdate", NullValueHandling = NullValueHandling.Ignore)]
    public DateTimeOffset? Birthdate { get; set; }

    [JsonProperty("customer_id", NullValueHandling = NullValueHandling.Ignore)]
    public Guid? CustomerId { get; set; }
}

public enum TypeEnum { CustomerRegistered, OrderAccepted, OrderCancelled, OrderDeclined, OrderFulfilled, ProductOrdered };

internal static class Converter
{
    public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
    {
        MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
        DateParseHandling = DateParseHandling.None,
        Converters =
            {
                TypeEnumConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
    };
}

internal class TypeEnumConverter : JsonConverter
{
    public override bool CanConvert(Type t) => t == typeof(TypeEnum) || t == typeof(TypeEnum?);

    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    {
        if (reader.TokenType == JsonToken.Null) return null;
        var value = serializer.Deserialize<string>(reader);
        switch (value)
        {
            case "customer_registered":
                return TypeEnum.CustomerRegistered;
            case "order_accepted":
                return TypeEnum.OrderAccepted;
            case "order_cancelled":
                return TypeEnum.OrderCancelled;
            case "order_declined":
                return TypeEnum.OrderDeclined;
            case "order_fulfilled":
                return TypeEnum.OrderFulfilled;
            case "product_ordered":
                return TypeEnum.ProductOrdered;
        }
        throw new Exception("Cannot unmarshal type TypeEnum");
    }

    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    {
        if (untypedValue == null)
        {
            serializer.Serialize(writer, null);
            return;
        }
        var value = (TypeEnum)untypedValue;
        switch (value)
        {
            case TypeEnum.CustomerRegistered:
                serializer.Serialize(writer, "customer_registered");
                return;
            case TypeEnum.OrderAccepted:
                serializer.Serialize(writer, "order_accepted");
                return;
            case TypeEnum.OrderCancelled:
                serializer.Serialize(writer, "order_cancelled");
                return;
            case TypeEnum.OrderDeclined:
                serializer.Serialize(writer, "order_declined");
                return;
            case TypeEnum.OrderFulfilled:
                serializer.Serialize(writer, "order_fulfilled");
                return;
            case TypeEnum.ProductOrdered:
                serializer.Serialize(writer, "product_ordered");
                return;
        }
        throw new Exception("Cannot marshal type TypeEnum");
    }

    public static readonly TypeEnumConverter Singleton = new TypeEnumConverter();
}

