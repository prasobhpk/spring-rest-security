package com.futureprocessing.spring.infrastructure.externalwebservice;

import com.futureprocessing.spring.domain.DomainUser;
import com.futureprocessing.spring.infrastructure.AuthenticatedExternalWebService;
import com.futureprocessing.spring.infrastructure.security.ExternalServiceAuthenticator;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
@Component("someExternalServiceAuthenticator")
public class SomeExternalServiceAuthenticator implements ExternalServiceAuthenticator {

	@Value("${backend.admin.username}")
	private String adminUserName;
    @Override
    public AuthenticatedExternalWebService authenticate(String username, String password) {
        ExternalWebServiceStub externalWebService = new ExternalWebServiceStub();

        // Do all authentication mechanisms required by external web service protocol and validated response.
        // Throw descendant of Spring AuthenticationException in case of unsucessful authentication. For example BadCredentialsException

        // ...
        // ...

        // If authentication to external service succeeded then create authenticated wrapper with proper Principal and GrantedAuthorities.
        // GrantedAuthorities may come from external service authentication or be hardcoded at our layer as they are here with ROLE_DOMAIN_USER
        AuthenticatedExternalWebService authenticatedExternalWebService = new AuthenticatedExternalWebService(new DomainUser(username), null,
                AuthorityUtils.commaSeparatedStringToAuthorityList(username.equals(adminUserName)?"BACKEND_ADMIN":"ROLE_DOMAIN_USER"));
        authenticatedExternalWebService.setExternalWebService(externalWebService);

        return authenticatedExternalWebService;
    }
}
