package com.vixteam.teamaudit.repositories;

import com.vixteam.framework.common.support.PagedList;
import com.vixteam.framework.common.support.QueryObject;
import com.vixteam.framework.domain.IEntity;

import java.io.Serializable;

public interface IEntityRepository {
    PagedList find(String entityPath, QueryObject queryObject);

    Object get(String entityPath, Serializable id) throws ClassNotFoundException;

    <TEntity extends IEntity> TEntity save(TEntity entity);

    void delete(String entityPath, Serializable id) throws ClassNotFoundException;
}
