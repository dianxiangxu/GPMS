package gpms.dao;

public interface EntityDao<T, K> {
	T findById(K id);

	K save(T object);

	T update(T object); // returns an up-to-date version of the entity
}
