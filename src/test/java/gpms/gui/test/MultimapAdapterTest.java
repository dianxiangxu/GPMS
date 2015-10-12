package gpms.gui.test;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.Map;

import junit.framework.TestCase;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import com.google.common.reflect.TypeParameter;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class MultimapAdapterTest extends TestCase {
	static class MultimapAdapter implements
			JsonDeserializer<Multimap<String, ?>>,
			JsonSerializer<Multimap<String, ?>> {
		@Override
		public Multimap<String, ?> deserialize(JsonElement json, Type type,
				JsonDeserializationContext context) throws JsonParseException {
			final HashMultimap<String, Object> result = HashMultimap.create();
			final Map<String, Collection<Object>> map = context.deserialize(
					json, multimapTypeToMapType(type));
			for (final Map.Entry<String, Collection<Object>> e : map.entrySet()) {
				result.putAll(e.getKey(), e.getValue());
			}
			return result;
		}

		@Override
		public JsonElement serialize(Multimap<String, ?> src, Type type,
				JsonSerializationContext context) {
			final Map<?, ?> map = src.asMap();
			return context.serialize(map);
		}

		private <V> Type multimapTypeToMapType(Type type) {
			final Type[] typeArguments = ((ParameterizedType) type)
					.getActualTypeArguments();
			assert typeArguments.length == 2;
			@SuppressWarnings("unchecked")
			final TypeToken<Map<String, Collection<V>>> mapTypeToken = new TypeToken<Map<String, Collection<V>>>() {
			}.where(new TypeParameter<V>() {
			}, (TypeToken<V>) TypeToken.of(typeArguments[1]));
			return mapTypeToken.getType();
		}
	}

	// / End of the Adapter, test code follows.

	public static class Obj {
		private int x;
		private int y;

		public Obj(int x, int y) {
			super();
			this.x = x;
			this.y = y;
		}

	}

	public void test1() {
		final MultimapAdapter multimapAdapter = new MultimapAdapter();
		final Type type = new TypeToken<HashMultimap<String, Obj>>() {
		}.getType();
		// final Type type2 = new TypeToken<Multimap<String, Obj>>()
		// {}.getType();
		final Gson gson = new GsonBuilder().setPrettyPrinting()
				.registerTypeAdapter(HashMultimap.class, multimapAdapter)
				.create();

		final HashMultimap<String, Obj> multimap = HashMultimap.create();
		multimap.put("a", new Obj(1, 2));
		multimap.put("a", new Obj(3, 4));
		multimap.put("b", new Obj(5, 6));

		final String json = gson.toJson(multimap);
		assertTrue(json.contains("\"y\": 6"));

		final HashMultimap<String, Obj> multimap2 = gson.fromJson(json, type);
		assertEquals(multimap, multimap2);
	}
}
