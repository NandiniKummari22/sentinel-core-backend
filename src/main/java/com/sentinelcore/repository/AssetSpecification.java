package com.sentinelcore.repository;

import com.sentinelcore.Entity.Asset;
import org.springframework.data.jpa.domain.Specification;

public class AssetSpecification {

    public static Specification<Asset> searchAssets(String search, String status, String risk) {
        return (root, query, cb) -> {
            Specification<Asset> specification = null;

            if (search != null && !search.isBlank()) {
                Specification<Asset> searchSpec = (root1, query1, cb1) ->
                        cb1.like(cb1.lower(root1.get("asset_name")),
                                "%" + search.toLowerCase() + "%");
                specification = searchSpec;
            }

            if (status != null && !status.isBlank()) {
                Specification<Asset> statusSpec = (root1, query1, cb1) ->
                        cb1.equal(root1.get("status"), status);

                specification = specification == null ? statusSpec : specification.and(statusSpec);
            }

            if (specification == null) {
                return cb.conjunction();
            }
            return specification.toPredicate(root, query, cb);
        };
    }
}