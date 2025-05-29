package com.tfc.rallyshop.dto;

import java.util.List;

public class PaymentRequest {
    private List<Long> cochesIds;
    private Long usuarioId;

    public List<Long> getCochesIds() {
        return cochesIds;
    }

    public void setCochesIds(List<Long> cochesIds) {
        this.cochesIds = cochesIds;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }
}
