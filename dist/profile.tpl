<!-- Popup -->
<div id="register-change" class="white-popup mfp-hide">
    <div class="registration" id="office-auth-form">
        <h3 class="registration__title">Изменить регистрационные данные</h3>
        <div class="registration__form">
                <div data-src="parent" class="registration__data is-open">
                    <div class="registration__col">
                        <input type="text" name="username" value="{$username}" placeholder="{'office_profile_username' | lexicon}"
                   class="form-control"/>
                        <input type="text" name="fullname" value="{$fullname}" placeholder="{'office_profile_fullname' | lexicon}"
               class="form-control"/>
                        <input type="text" name="email" value="{$email}" placeholder="{'office_profile_email' | lexicon}"
                   class="form-control"/>
                        <input type="text" name="mobilephone" placeholder="" value="{$mobilephone}" class="form-control"/>
                        <div class="form-group hidden">
                           <label class="col-sm-2 control-label">{'office_auth_register_phone_code' | lexicon}</label>
                           <div class="col-md-10">
                               <input type="text" name="phone_code" value="" class="form-control"/>
                               <p class="help-block message">{$error_phone_code}</p>
                               <p class="help-block desc">{'office_profile_phone_code_desc' | lexicon}</p>
                           </div>
                       </div>
                       <div class="form-group">
                          <label class="col-sm-2 control-label">{'office_profile_password' | lexicon}</label>
                          <div class="col-sm-10">
                              <input type="password" name="specifiedpassword" value="" placeholder="********" class="form-control"/>
                              <p class="help-block message">{$error_specifiedpassword}</p>
                              <p class="help-block desc">{'office_profile_specifiedpassword_desc' | lexicon}</p>
                              <input type="password" name="confirmpassword" value="" placeholder="********" class="form-control"/>
                              <p class="help-block message">{$error_confirmpassword}</p>
                              <p class="help-block desc">{'office_profile_confirmpassword_desc' | lexicon}</p>
                          </div>
                      </div>
                        <select name="second-name" class="registration__select">
                            <option value="mother">Я мама</option>
                            <option value="father">Я папа</option>
                        </select>
                    </div>
                    <div class="registration__col">
                        <div class="js-add-more-fields">
                            <select name="child" class="registration__select">
                                <option value="son">У меня сын</option>
                                <option value="daughter">У меня дочь</option>
                            </select>
                            <select name="children-age" class="registration__select">
                                <option value="8">8 лет</option>
                                <option value="9">9 лет</option>
                                <option value="10">10 лет</option>
                            </select>
                            <input type="text" name="child-name" placeholder="Имя ребенка">
                        </div>
                        <div class="registration__add-child">
                            <span class="plus js-registration-plus" ></span>
                            <p>Еще один ребенок</p>
                        </div>
                    </div>
                    <div class="registration__col">
                        <label for="photo-parent" class="registration__add-photo js-add-photo">
                            <img src="#" alt="Photo" class="profile-photo js-showSelectedImage">
                        </label>
                        <input id="photo-parent" type="file" class="js-photo-input" />
                    </div>
                </div>


                <button type="submit" class="btn btn--green registration__send">Изменить</button>
            </form>
        </div>
    </div>
</div>
